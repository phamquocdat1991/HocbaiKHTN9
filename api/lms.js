import {randomUUID} from 'node:crypto';
import {initialSchool} from '../src/content.js';
import {newUser,mutate,gradeUser} from '../src/domain.js';
import {validateAccount,changeRole} from '../src/accounts.js';
import {config,configured as isConfigured,identity as lookupIdentity,read,commit,allUsers,createAccount,resetPassword} from '../server/supabase.js';
import {sanitizeHTML} from '../server/sanitize.js';
import {periodsOf} from '../src/learning.js';
const fail=(status,message)=>Object.assign(new Error(message),{status});
export function sanitize(s,u){if(u.role==='teacher')return s;const copy=structuredClone(s);copy.classes=copy.classes.filter(c=>c.id===u.classId).map(({code,...c})=>c);for(const key of ['exams','assignments','announcements'])copy[key]=copy[key].filter(x=>x.classId===u.classId);const publicIds=new Set();copy.lessons=copy.lessons.map(l=>{l.periods=periodsOf(l).map(p=>{if(!p.unlocked)return {...p,html:'',media:{type:'none',url:''},attachments:[],quiz:{enabled:false,required:false,questionIds:[],passScore:5,maxAttempts:0}};p.quiz.questionIds.forEach(id=>publicIds.add(id));return p});if(l.question){const {correct,explanation,...q}=l.question;l.question=q}if(!l.periods.some(p=>p.unlocked)){l.concepts=[];l.activity='';delete l.question;l.hook='Tiết học chưa được mở.'}return l});copy.questions=copy.questions.filter(q=>publicIds.has(q.id));delete copy.settings.knowledge;delete copy.settings.aiModels;return copy}
export function publicUser(u){const copy=structuredClone(u);for(const a of copy.attempts)if(a.status==='active')a.questions=a.questions.map(({correct,explanation,...q})=>q);return copy}
export default async function handler(req,res){res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json');try{
const e=config();const configured=isConfigured();if(req.method==='GET')return res.status(200).json({configured,provider:'supabase',url:configured?e.url:null,apiKey:configured?e.key:null,aiConfigured:!!process.env.GEMINI_API_KEY});if(req.method!=='POST')return res.status(405).json({error:'Phương thức không hỗ trợ.'});if(!configured)throw fail(503,'Chưa kết nối Supabase. Em có thể dùng chế độ trải nghiệm.');
const raw=typeof req.body==='string'?JSON.parse(req.body):req.body; if(JSON.stringify(raw).length>2000000)throw fail(413,'Dữ liệu gửi quá lớn.');const {action,payload:p={}}=raw||{};
const bearer=req.headers.authorization?.replace(/^Bearer /,'');if(!bearer)throw fail(401,'Cần đăng nhập.');const identity=await lookupIdentity(bearer);
const admin=identity.emailVerified&&String(process.env.ADMIN_EMAIL||'phamquocdat1991@gmail.com').toLowerCase()===identity.email?.toLowerCase();
let [sd,ud]=await Promise.all([read('school/main'),read('users/'+identity.localId)]);let s=sd?.value||initialSchool(),u=ud?.value||newUser(identity.localId,identity.displayName||identity.email.split('@')[0]);u.isAdmin=!!admin;u.email=identity.email;u.role=admin||ud?.value.role==='teacher'?'teacher':'student';const teacher=u.role==='teacher';
if(action==='state'){if(!sd||!ud)await commit([...(!sd?[{path:'school/main',value:s,old:sd}]:[]),...(!ud?[{path:'users/'+u.id,value:u,old:ud}]:[])]);return res.status(200).json({school:sanitize(s,u),user:publicUser(u),users:teacher?await allUsers():[]})}

if(['createAccount','resetAccount','setRole'].includes(action)){
 if(!teacher)throw fail(403,'Không đủ quyền quản lý tài khoản.');
 if(action==='createAccount'){
  const validated=validateAccount(u,s,{...p,id:randomUUID()});
  const value=await createAccount(validated,p.password);
  await commit([{path:'users/'+value.id,value,old:null}]);
 }else{
  if(!/^[a-zA-Z0-9_-]+$/.test(p.userId))throw fail(400,'Tài khoản không hợp lệ.');
  const target=await read('users/'+p.userId);if(!target)throw fail(404,'Không tìm thấy tài khoản.');
  if(action==='setRole'){const value=changeRole(u,target.value,p.role);await commit([{path:'users/'+p.userId,value,old:target}]);}
  else{if(target.value.role!=='student')throw fail(403,'Chỉ đổi mật khẩu tài khoản học sinh.');if(typeof p.password!=='string'||p.password.length<8||p.password.length>128)throw fail(400,'Mật khẩu cần 8–128 ký tự.');
   await resetPassword(p.userId,p.password);}

 }
 return res.status(200).json({school:s,user:publicUser(u),users:await allUsers()});
}

if(action==='chat'){
if(u.attempts.some(a=>a.status==='active'))throw fail(403,'Trợ lý tạm ẩn trong lúc kiểm tra.');if(typeof p.message!=='string'||!p.message.trim()||p.message.length>2000)throw fail(400,'Câu hỏi tối đa 2000 ký tự.');
const currentDay=new Date().toISOString().slice(0,10);const ai=u.aiUsage?.day===currentDay?u.aiUsage:{day:currentDay,count:0,last:0};if(ai.count>=30||Date.now()-ai.last<4000)throw fail(429,'Vui lòng chờ hoặc quay lại ngày mai (30 câu hỏi/ngày).');const key=p.personalKey||process.env.GEMINI_API_KEY;if(typeof key!=='string'||key.length<10)throw fail(503,'Giáo viên chưa cấu hình AI.');u.aiUsage={day:currentDay,count:ai.count+1,last:Date.now()};await commit([{path:'users/'+u.id,value:u,old:ud}]);
const models=(s.settings.aiModels||process.env.GEMINI_MODELS||'gemini-2.5-flash').split(',').map(x=>x.trim()).filter(x=>/^[a-zA-Z0-9.-]+$/.test(x));const context=(s.settings.knowledge||'')+'\n'+s.lessons.filter(l=>p.lessonId===l.id).map(l=>l.title+': '+l.concepts.join(' ')).join('\n');
for(const model of models){const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent',{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':key},signal:AbortSignal.timeout(18000),body:JSON.stringify({systemInstruction:{parts:[{text:'Bạn là trợ lý KHTN 9 theo bộ Kết nối tri thức với cuộc sống. Không bịa số trang hoặc trích dẫn SGK. Dùng tiếng Việt ngắn gọn, thân thiện, hỏi gợi mở. Không bịa số liệu; nêu rõ khi chưa chắc. Không hướng dẫn thí nghiệm nguy hiểm. Nội dung tham khảo: '+context.slice(0,30000)}]},contents:[{role:'user',parts:[{text:p.message}]}],generationConfig:{maxOutputTokens:1200}})});if(r.ok){const j=await r.json();const answer=j.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('');if(answer)return res.status(200).json({answer})}if(![429,500,502,503,504].includes(r.status))break}throw fail(503,'AI đang bận hoặc model chưa khả dụng; vui lòng thử lại.')}
if(action==='grade'){if(!teacher)throw fail(403,'Không đủ quyền.');if(!/^[a-zA-Z0-9_-]+$/.test(p.userId))throw fail(400,'Tài khoản không hợp lệ.');const target=await read('users/'+p.userId);if(!target)throw fail(404,'Không tìm thấy học sinh.');const value=gradeUser(u,target.value,p);await commit([{path:'users/'+p.userId,value,old:target}]);return res.status(200).json({school:s,user:u,users:await allUsers()})}
if(action==='saveEntity'&&p.collection==='lessons'&&Array.isArray(p.entity?.periods))p.entity.periods=p.entity.periods.map(t=>({...t,html:sanitizeHTML(String(t.html||''))}));
const next=mutate(s,u,action,p);await commit([{path:'users/'+u.id,value:next.user,old:ud},...(JSON.stringify(s)!==JSON.stringify(next.school)?[{path:'school/main',value:next.school,old:sd}]:[])]);return res.status(200).json({school:sanitize(next.school,next.user),user:publicUser(next.user),users:teacher?await allUsers():[]});
}catch(error){res.status(error.status||400).json({error:error.status?error.message:(error.message?.includes('PEM')?'Cấu hình kết nối máy chủ chưa hợp lệ.':error.message||'Không thể hoàn thành thao tác.')})}}
