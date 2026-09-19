import React,{useState} from 'react';
import {Search,Plus,BookOpen,Lock,CheckCircle2,Sparkles} from 'lucide-react';
import {useApp} from './store.jsx';
import {chapters} from './content.js';
import {periodsOf,periodRecord} from './learning.js';
import {lessonQuestionsMap} from './lesson-questions.js';

export default function LessonManager({edit}){
  const a=useApp(),[query,Q]=useState(''),[chapter,C]=useState('all'),[tab,T]=useState('structure'),[chosen,S]=useState(a.school.lessons[0]?.id),[classId,F]=useState('all');
  const lessons=a.school.lessons.filter(l=>(chapter==='all'||l.chapter===+chapter)&&l.title.toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')));
  const l=lessons.find(l=>l.id===chosen)||lessons[0],ps=l?periodsOf(l):[];
  const students=a.users.filter(u=>u.role==='student'&&(classId==='all'||u.classId===classId));

  const applyTenQuestions = async (lesson) => {
    try {
      const qs = lessonQuestionsMap[lesson.id] || (a.school?.questions || []).filter(q => q.lessonId === lesson.id);
      const tenQs = qs.slice(0, 10);
      const qIds = tenQs.map(q => q.id);
      if (qIds.length === 0) throw new Error('Không tìm thấy câu hỏi phù hợp cho bài này.');
      const ps = periodsOf(lesson);
      const updatedPeriods = ps.map((p, i) => i === 0 ? {
        ...p,
        quiz: {
          ...p.quiz,
          enabled: true,
          required: true,
          passScore: (p.quiz.passScore && p.quiz.passScore > 0) ? p.quiz.passScore : 5,
          maxAttempts: p.quiz.maxAttempts || 0,
          questionIds: qIds
        }
      } : p);
      await a.act('saveEntity', {
        collection: 'lessons',
        entity: { ...lesson, questions: tenQs, periods: updatedPeriods }
      });
      alert(`✓ Đã chèn 10 câu hỏi củng cố trắc nghiệm kèm đáp án gợi ý cho bài "${lesson.title}"!`);
    } catch (err) {
      alert(err.message);
    }
  };

  const syncAllLessonsTenQuestions = async () => {
    if (!window.confirm('Thầy/Cô có muốn tự động chèn 10 câu hỏi củng cố trắc nghiệm chuẩn KHTN 9 (kèm đáp án gợi ý) cho tất cả bài học trong chương trình?')) return;
    try {
      for (const item of a.school.lessons) {
        const qs = lessonQuestionsMap[item.id] || (a.school?.questions || []).filter(q => q.lessonId === item.id);
        const tenQs = qs.slice(0, 10);
        const qIds = tenQs.map(q => q.id);
        if (qIds.length > 0) {
          const ps = periodsOf(item);
          const updatedPeriods = ps.map((p, i) => i === 0 ? {
            ...p,
            quiz: {
              ...p.quiz,
              enabled: true,
              required: true,
              passScore: (p.quiz.passScore && p.quiz.passScore > 0) ? p.quiz.passScore : 5,
              maxAttempts: p.quiz.maxAttempts || 0,
              questionIds: qIds
            }
          } : p);
          await a.act('saveEntity', {
            collection: 'lessons',
            entity: { ...item, questions: tenQs, periods: updatedPeriods }
          });
        }
      }
      alert('✓ Đã đồng bộ thành công 10 câu hỏi củng cố trắc nghiệm kèm đáp án gợi ý cho tất cả bài học!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="period-tabs">
        <button className={tab==='structure'?'selected':''} onClick={()=>T('structure')}>Cấu trúc bài & mở khoá</button>
        <button className={tab==='progress'?'selected':''} onClick={()=>T('progress')}>Tiến độ & điểm củng cố</button>
      </div>
      <div className="toolbar">
        <div className="search">
          <Search size={17}/>
          <input aria-label="Tìm bài giảng" placeholder="Tìm bài giảng…" value={query} onChange={e=>Q(e.target.value)}/>
        </div>
        <select aria-label="Lọc chương giảng dạy" value={chapter} onChange={e=>C(e.target.value)}>
          <option value="all">Tất cả chương</option>
          {chapters.map(c=><option key={c.id} value={c.id}>{c.id===0?'Mở đầu':'Chương '+c.id+'. '+c.name}</option>)}
        </select>
        <button
          type="button"
          className="secondary btn-sync-all"
          onClick={syncAllLessonsTenQuestions}
          title="Tự động chèn 10 câu hỏi củng cố trắc nghiệm chuẩn KHTN 9 cho toàn bộ 51 bài học"
        >
          <Sparkles size={16}/>
          <span>Đồng bộ 10 câu củng cố tất cả bài</span>
        </button>
      </div>
      <div className="studio-layout">
        <aside className="studio-list">
          <p>{lessons.length} bài học</p>
          {lessons.map(x=>(
            <button key={x.id} className={x.id===l?.id?'active':''} onClick={()=>S(x.id)}>
              <BookOpen size={19}/>
              <span>
                <b>{x.title}</b>
                <small>{periodsOf(x).length} tiết · {periodsOf(x).filter(p=>p.unlocked).length} mở khoá · {periodsOf(x)[0]?.quiz?.enabled?periodsOf(x)[0].quiz.questionIds.length+' câu củng cố':'Chưa bật củng cố'}</small>
              </span>
            </button>
          ))}
        </aside>
        <section className="panel studio-detail">
          {l?(
            <>
              <div className="toolbar">
                <div>
                  <span className="eyebrow">LỘ TRÌNH GIẢNG DẠY</span>
                  <h2>{l.title}</h2>
                </div>
                <div className="actions">
                  <button
                    type="button"
                    className="secondary"
                    onClick={()=>applyTenQuestions(l)}
                    title="Tự động chèn 10 câu hỏi củng cố trắc nghiệm chuẩn cho bài này"
                  >
                    <Sparkles size={16}/> Chèn 10 câu củng cố
                  </button>
                  <button className="primary" onClick={()=>edit({collection:'lessons',entity:l})}>
                    Biên soạn & chỉnh sửa
                  </button>
                </div>
              </div>
              {tab==='structure'?(
                <>
                  {ps.map(p=>(
                    <div className="period-row" key={p.id}>
                      <span className={'period-number '+(!p.unlocked?'locked':'')}>{p.unlocked?p.order:<Lock size={18}/>}</span>
                      <div>
                        <h3>{p.title}</h3>
                        <p>{p.minutes} phút · {p.media.type==='none'?'Văn bản':'Có media'} · {p.attachments.length} tài liệu · {p.quiz.enabled?p.quiz.questionIds.length+' câu củng cố':'Chưa bật củng cố'}</p>
                        <small>{p.quiz.required?'Hoàn thành khi đạt '+p.quiz.passScore+'/10':'Tự đánh dấu hoàn thành'} · {p.quiz.maxAttempts?p.quiz.maxAttempts+' lượt':'Cho phép làm lại'}</small>
                      </div>
                      <span className="badge">{p.unlocked?'Đã mở':'Đang khoá'}</span>
                    </div>
                  ))}
                  <p className="muted">Học sinh chỉ đọc được nội dung tiết đã mở. Điểm củng cố và trạng thái hoàn thành được kiểm tra khi lưu.</p>
                </>
              ):(
                <>
                  <select aria-label="Lọc lớp theo tiến độ" value={classId} onChange={e=>F(e.target.value)}>
                    <option value="all">Tất cả lớp</option>
                    {a.school.classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Học sinh</th>
                          {ps.map(p=><th key={p.id}>Tiết {p.order}</th>)}
                          <th>Hoàn thành</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(u=>(
                          <tr key={u.id}>
                            <td>{u.name}</td>
                            {ps.map(p=>{
                              const r=periodRecord(u,l,p);
                              return (
                                <td key={p.id}>
                                  {r.completed?'✓ Hoàn thành':'Đang học'}<br/>
                                  {r.attempts.length?'Cao nhất: '+Math.max(...r.attempts.map(x=>x.score))+'/10':'Chưa làm củng cố'}<br/>
                                  <small>{r.attempts.length} lượt · {Math.floor(r.seconds/60)} phút</small>
                                </td>
                              );
                            })}
                            <td>{ps.filter(p=>periodRecord(u,l,p).completed).length}/{ps.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {!students.length&&<p>Chưa có học sinh trong lớp đã chọn.</p>}
                </>
              )}
            </>
          ):(
            <p>Không tìm thấy bài học.</p>
          )}
        </section>
      </div>
    </>
  );
}
