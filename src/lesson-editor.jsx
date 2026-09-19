import React,{useRef,useState} from 'react';
import {cleanHTML} from './html.js';
import {X,Plus,Save,BookOpen,Film,ClipboardCheck,Sparkles,CheckCircle2,Search,Eye,EyeOff} from 'lucide-react';
import {useApp} from './store.jsx';
import {chapters,topics} from './content.js';
import {periodsOf,safeUrl} from './learning.js';
import {Media} from './lesson-reader.jsx';
import {lessonQuestionsMap} from './lesson-questions.js';

const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function baseHTML(l){return '<h2>Kiến thức trọng tâm</h2>'+l.concepts.map(c=>'<p>'+escape(c)+'</p>').join('')+'<h2>Quan sát & vận dụng</h2><p>'+escape(l.activity)+'</p>'}
function RichEditor({value,onChange}){const ref=useRef(null),[mode,M]=useState('edit'),[link,L]=useState('');const command=(c,v)=>{ref.current?.focus();document.execCommand(c,false,v);onChange(ref.current.innerHTML)};return <div className="rich-editor"><div className="editor-modes">{[['edit','Soạn thảo'],['preview','Xem trước'],['html','Mã HTML']].map(([k,t])=><button type="button" key={k} className={mode===k?'selected':''} onClick={()=>M(k)}>{t}</button>)}</div>{mode==='edit'?<><div className="format-bar">{[['bold','Đậm'],['italic','Nghiêng'],['underline','Gạch chân'],['insertUnorderedList','• Danh sách'],['insertOrderedList','1. Danh sách'],['undo','Hoàn tác'],['redo','Làm lại'],['removeFormat','Xoá định dạng']].map(([c,t])=><button type="button" key={c} onMouseDown={e=>e.preventDefault()} onClick={()=>command(c)}>{t}</button>)}<button type="button" onClick={()=>command('formatBlock','h2')}>Tiêu đề</button><button type="button" onClick={()=>command('formatBlock','p')}>Văn bản</button><button type="button" onClick={()=>command('insertHTML','<table><tbody><tr><th>Nội dung</th><th>Ghi nhớ</th></tr><tr><td>…</td><td>…</td></tr></tbody></table><p><br></p>')}>Chèn bảng</button><label>Màu chữ<input type="color" onChange={e=>command('foreColor',e.target.value)}/></label></div><div ref={el=>{if(el&&el!==ref.current){el.innerHTML=cleanHTML(value);ref.current=el}}} role="textbox" aria-label="Nội dung định dạng" aria-multiline="true" contentEditable suppressContentEditableWarning className="rich-content" onBlur={e=>onChange(cleanHTML(e.currentTarget.innerHTML))}/><div className="toolbar"><input aria-label="Liên kết chèn vào bài" type="url" placeholder="https://…" value={link} onChange={e=>L(e.target.value)}/><button type="button" onClick={()=>{if(safeUrl(link))command('insertHTML','<p><a href="'+escape(safeUrl(link))+'">'+escape(link)+'</a></p>')}}>Chèn liên kết</button></div></>:mode==='html'?<label>Mã HTML đã lọc khi lưu<textarea value={value} onChange={e=>onChange(e.target.value)} rows={14}/></label>:<div className="rich-content" dangerouslySetInnerHTML={{__html:cleanHTML(value)}}/>}</div>}
const names={none:'Không có media',video:'Video · YouTube / Vimeo / MP4',slides:'Slide · Google Slides / Canva',document:'Tài liệu · PDF / Word / Drive',web:'Trang web / E-learning'};
export default function LessonEditor({entity,close}){
  const a=useApp();
  const [l,L]=useState(()=>{
    const x=entity||{id:crypto.randomUUID(),title:'',chapter:0,topic:'intro',minutes:45,hook:'Cùng tìm hiểu vấn đề khoa học.',concepts:['Kiến thức trọng tâm cần đạt.'],activity:'Vận dụng kiến thức để giải thích hiện tượng.'};
    return {...x,periods:periodsOf(x).map(p=>({...p,html:p.html||baseHTML(x)}))};
  });
  const [selected,S]=useState(0);
  const [error,E]=useState('');
  const [notice,setNotice]=useState('');
  const [qSearch,setQSearch]=useState('');
  const [qFilter,setQFilter]=useState('lesson');
  const [previewQ,setPreviewQ]=useState(null);

  const p=l.periods[selected];
  const set=(key,v)=>L(x=>({...x,[key]:v}));
  const patch=v=>L(x=>({...x,periods:x.periods.map((p,i)=>i===selected?{...p,...v}:p)}));
  const quiz=v=>patch({quiz:{...p.quiz,...v}});

  const lessonStandardQs = lessonQuestionsMap[l.id] || (a.school?.questions || []).filter(q => q.lessonId === l.id) || (l.questions || []);

  const insertTenQuestions = () => {
    let qs = lessonQuestionsMap[l.id];
    if (!qs || qs.length === 0) {
      qs = (a.school?.questions || []).filter(q => q.lessonId === l.id);
    }
    if (!qs || qs.length === 0) {
      qs = l.questions || [];
    }
    if (!qs || qs.length === 0) {
      qs = (a.school?.questions || []).filter(q => q.topic === l.topic).slice(0, 10);
      if (qs.length < 10) qs = (a.school?.questions || []).slice(0, 10);
    }
    const tenQs = qs.slice(0, 10);
    const tenIds = tenQs.map(q => q.id);

    if (!l.questions || l.questions.length < 10) {
      set('questions', tenQs);
    }

    quiz({
      enabled: true,
      required: true,
      passScore: (p.quiz.passScore && p.quiz.passScore > 0) ? p.quiz.passScore : 5,
      maxAttempts: p.quiz.maxAttempts || 0,
      questionIds: tenIds
    });

    setNotice('✓ Đã chèn đủ 10 câu hỏi củng cố chuẩn KHTN 9 kèm đáp án gợi ý & giải thích cho bài học!');
    setTimeout(() => setNotice(''), 6000);
  };

  const allSchoolQuestions = a.school?.questions || [];
  const baseList = qFilter === 'lesson'
    ? (lessonStandardQs.length > 0 ? lessonStandardQs : allSchoolQuestions.filter(q => q.lessonId === l.id))
    : qFilter === 'selected'
    ? allSchoolQuestions.filter(q => p.quiz.questionIds.includes(q.id))
    : allSchoolQuestions;

  const displayQuestions = baseList.filter(q => {
    if (!qSearch.trim()) return true;
    return q.text.toLocaleLowerCase('vi').includes(qSearch.toLocaleLowerCase('vi'));
  });

  const save=async ev=>{
    ev.preventDefault();
    E('');
    try{
      await a.act('saveEntity',{collection:'lessons',entity:{...l,periods:l.periods.map(p=>({...p,html:cleanHTML(p.html)}))}});
      close();
    }catch(e){
      E(e.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal lesson-modal" role="dialog" aria-modal="true" aria-label="Biên soạn bài và tiết học">
        <button className="modal-close" aria-label="Đóng" onClick={close}><X/></button>
        <header>
          <span className="eyebrow">XƯỞNG HỌC LIỆU KHTN 9</span>
          <h2>Biên soạn bài & tiết học</h2>
          <p>Thiết kế trải nghiệm học từ kiến thức đến vận dụng.</p>
        </header>
        <form onSubmit={save}>
          <label>Tên bài học<input required maxLength={200} value={l.title} onChange={e=>set('title',e.target.value)}/></label>
          <div className="form-grid">
            <label>Chương<select value={l.chapter??0} onChange={e=>set('chapter',+e.target.value)}>{chapters.map(c=><option key={c.id} value={c.id}>{c.id===0?'Mở đầu':c.id+'. '+c.name}</option>)}</select></label>
            <label>Mạch kiến thức<select value={l.topic} onChange={e=>set('topic',e.target.value)}>{topics.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
            <label>Thời lượng bài (phút)<input type="number" min={1} max={180} value={l.minutes} onChange={e=>set('minutes',+e.target.value)}/></label>
          </div>
          <label>Câu hỏi gợi mở<input required maxLength={2000} value={l.hook} onChange={e=>set('hook',e.target.value)}/></label>
          <div className="period-tabs">
            {l.periods.map((t,i)=><button type="button" key={t.id} className={i===selected?'selected':''} onClick={()=>S(i)}>Tiết {t.order} {!t.unlocked?'· Khoá':''}</button>)}
            <button type="button" disabled={l.periods.length>=30} onClick={()=>{const n={id:crypto.randomUUID(),title:'Tiết học mới',order:Math.max(...l.periods.map(p=>p.order))+1,minutes:45,unlocked:false,html:'<h2>Yêu cầu cần đạt</h2><p>…</p>',media:{type:'none',url:''},attachments:[],quiz:{enabled:false,required:false,passScore:5,maxAttempts:0,questionIds:[]}};set('periods',[...l.periods,n]);S(l.periods.length)}}><Plus size={15}/>Thêm tiết</button>
          </div>

          <section className="editor-section">
            <h3><BookOpen size={19}/>Thông tin tiết học</h3>
            <label>Tiêu đề tiết<input required maxLength={200} value={p.title} onChange={e=>patch({title:e.target.value})}/></label>
            <div className="form-grid">
              <label>Quyền truy cập<select value={String(p.unlocked)} onChange={e=>patch({unlocked:e.target.value==='true'})}><option value="true">Mở cho học sinh</option><option value="false">Khoá · đang biên soạn</option></select></label>
              <label>Thứ tự tiết<input type="number" required min={1} value={p.order} onChange={e=>patch({order:+e.target.value})}/></label>
              <label>Thời lượng (phút)<input type="number" required min={1} max={180} value={p.minutes} onChange={e=>patch({minutes:+e.target.value})}/></label>
            </div>
          </section>

          <section className="editor-section blue">
            <h3><Film size={19}/>Media chính & tài liệu bổ sung</h3>
            <div className="form-grid">
              <label>Loại media<select value={p.media.type} onChange={e=>patch({media:{...p.media,type:e.target.value}})}>{Object.entries(names).map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label>
              {p.media.type!=='none'&&<label>Liên kết media<input type="url" required placeholder={p.media.type==='slides'?'https://docs.google.com/presentation/d/... hoặc https://www.canva.com/design/...':'https://…'} value={p.media.url} onChange={e=>patch({media:{...p.media,url:e.target.value}})}/></label>}
            </div>
            {p.media.type==='slides'&&<p className="muted" style={{fontSize:'12px',margin:'6px 0 10px'}}>✨ <b>Tự động tối ưu:</b> Hỗ trợ liên kết chia sẻ, chỉnh sửa hoặc mã nhúng từ Google Slides và Canva. Hệ thống tự động chuyển sang chế độ trình chiếu toàn màn hình.</p>}
            {p.media.type!=='none'&&p.media.url&&safeUrl(p.media.url)&&<div className="media-preview-box"><span className="eyebrow" style={{fontSize:'11px',marginBottom:'6px',display:'block'}}>XEM TRƯỚC TRÌNH CHIẾU / MEDIA TIẾT HỌC</span><Media media={p.media} title={p.title}/></div>}
            {p.attachments.map((r,i)=><div className="attachment-edit" key={i}><select aria-label={'Loại tài liệu '+(i+1)} value={r.type} onChange={e=>patch({attachments:p.attachments.map((x,j)=>i===j?{...x,type:e.target.value}:x)})}>{Object.entries(names).filter(([k])=>k!=='none').map(([v,t])=><option key={v} value={v}>{t}</option>)}</select><input aria-label={'Tên tài liệu '+(i+1)} placeholder="Tên tài liệu" required value={r.title} onChange={e=>patch({attachments:p.attachments.map((x,j)=>i===j?{...x,title:e.target.value}:x)})}/><input aria-label={'URL tài liệu '+(i+1)} type="url" required placeholder="https://…" value={r.url} onChange={e=>patch({attachments:p.attachments.map((x,j)=>i===j?{...x,url:e.target.value}:x)})}/><button type="button" aria-label={'Bỏ tài liệu '+(i+1)} onClick={()=>patch({attachments:p.attachments.filter((_,j)=>i!==j)})}><X size={16}/></button></div>)}
            <button type="button" className="secondary" disabled={p.attachments.length>=10} onClick={()=>patch({attachments:[...p.attachments,{title:'',type:'document',url:''}]})}>+ Thêm tài liệu</button>
          </section>

          <section className="editor-section purple">
            <div className="section-header-row">
              <h3><ClipboardCheck size={19}/>Củng cố & điều kiện hoàn thành</h3>
              <button
                type="button"
                className="btn-insert-10-quick"
                onClick={insertTenQuestions}
                title="Tự động chèn 10 câu hỏi củng cố trắc nghiệm chuẩn kèm đáp án gợi ý cho bài học này"
              >
                <Sparkles size={16}/>
                <span>Chèn 10 câu củng cố bài này</span>
              </button>
            </div>

            {notice&&(
              <div className="editor-notice-pill" role="status">
                <CheckCircle2 size={16}/>
                <span>{notice}</span>
              </div>
            )}

            <label className="checkbox">
              <input type="checkbox" checked={p.quiz.enabled} onChange={e=>quiz({enabled:e.target.checked,required:e.target.checked&&p.quiz.required})}/>
              Bật trắc nghiệm củng cố
            </label>

            {p.quiz.enabled&&<>
              <div className="form-grid">
                <label>Điểm đạt (thang 10)<input type="number" min={0} max={10} step={0.5} value={p.quiz.passScore} onChange={e=>quiz({passScore:+e.target.value})}/></label>
                <label>Số lượt tối đa (0 = không giới hạn)<input type="number" min={0} max={20} value={p.quiz.maxAttempts} onChange={e=>quiz({maxAttempts:+e.target.value})}/></label>
              </div>
              <label className="checkbox"><input type="checkbox" checked={p.quiz.required} onChange={e=>quiz({required:e.target.checked})}/>Bắt buộc đạt điểm để hoàn thành tiết</label>

              <div className="quiz-selection-container">
                <div className="quiz-selection-top">
                  <div className="quiz-count-info">
                    <span>Số câu hỏi củng cố đã chọn: <b>{p.quiz.questionIds.length} / 10</b> câu</span>
                    {p.quiz.questionIds.length===10&&<span className="badge-complete-ten">✓ Chuẩn 10 câu củng cố</span>}
                  </div>
                  <div className="quiz-top-actions">
                    <button type="button" className="btn-action-sm" onClick={insertTenQuestions}>
                      <Sparkles size={14}/> Chèn nhanh 10 câu bài này
                    </button>
                    {p.quiz.questionIds.length>0&&(
                      <button type="button" className="btn-action-sm danger" onClick={()=>quiz({questionIds:[]})}>
                        <X size={14}/> Bỏ chọn tất cả
                      </button>
                    )}
                  </div>
                </div>

                <div className="quiz-filter-bar">
                  <div className="picker-tabs">
                    <button
                      type="button"
                      className={qFilter==='lesson'?'active':''}
                      onClick={()=>setQFilter('lesson')}
                    >
                      Câu hỏi của bài này ({lessonStandardQs.length})
                    </button>
                    <button
                      type="button"
                      className={qFilter==='selected'?'active':''}
                      onClick={()=>setQFilter('selected')}
                    >
                      Đã chọn ({p.quiz.questionIds.length})
                    </button>
                    <button
                      type="button"
                      className={qFilter==='all'?'active':''}
                      onClick={()=>setQFilter('all')}
                    >
                      Tất cả ngân hàng ({allSchoolQuestions.length})
                    </button>
                  </div>
                  <div className="picker-search-wrap">
                    <Search size={14}/>
                    <input
                      type="text"
                      placeholder="Tìm kiếm câu hỏi…"
                      value={qSearch}
                      onChange={e=>setQSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="question-picker-cards">
                  {displayQuestions.map((q,idx)=>{
                    const isChecked = p.quiz.questionIds.includes(q.id);
                    const isExpanded = previewQ === q.id;
                    return (
                      <div className={`question-card-item ${isChecked?'checked':''}`} key={q.id}>
                        <div className="q-card-head">
                          <label className="checkbox q-checkbox-label">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={e=>quiz({
                                questionIds: e.target.checked
                                  ? [...p.quiz.questionIds, q.id]
                                  : p.quiz.questionIds.filter(id=>id!==q.id)
                              })}
                            />
                            <span className="q-title-text">
                              <b className="q-index-num">#{idx+1}</b> {q.text}
                            </span>
                          </label>
                          <div className="q-card-badges">
                            {q.level&&<span className={`q-level-pill ${q.level==='Vận dụng'?'high':q.level==='Thông hiểu'?'med':'low'}`}>{q.level}</span>}
                            <button
                              type="button"
                              className="btn-preview-toggle"
                              onClick={()=>setPreviewQ(isExpanded ? null : q.id)}
                              title={isExpanded ? 'Ẩn đáp án gợi ý' : 'Xem đáp án gợi ý & giải thích'}
                            >
                              {isExpanded ? <EyeOff size={13}/> : <Eye size={13}/>}
                              <span>{isExpanded ? 'Ẩn gợi ý' : 'Xem đáp án & gợi ý'}</span>
                            </button>
                          </div>
                        </div>

                        {isExpanded&&(
                          <div className="q-card-expanded">
                            <div className="preview-options">
                              {q.options?.map((opt, optIdx)=>(
                                <div key={optIdx} className={`preview-opt-row ${optIdx===q.correct?'is-correct':''}`}>
                                  <span className="opt-marker">{'ABCD'[optIdx]}</span>
                                  <span className="opt-text-content">{opt}</span>
                                  {optIdx===q.correct&&<span className="correct-tag-badge">✓ Đáp án đúng</span>}
                                </div>
                              ))}
                            </div>
                            {q.explanation&&(
                              <div className="preview-explanation-box">
                                <b>💡 Gợi ý giải thích:</b> {q.explanation}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {displayQuestions.length===0&&(
                    <p className="muted empty-picker-note">Không tìm thấy câu hỏi phù hợp trong danh mục này.</p>
                  )}
                </div>
              </div>
            </>}
          </section>

          <section className="editor-section">
            <h3>Nội dung chi tiết · Tiết {p.order}</h3>
            <div className="template-bar">
              {[['Yêu cầu cần đạt','Nêu được…; giải thích được…; vận dụng được…'],['Công thức & đơn vị','Đại lượng — Kí hiệu — Đơn vị SI — Điều kiện áp dụng.'],['Thí nghiệm an toàn','Dụng cụ; dự đoán; thao tác; quan sát; kết luận; lưu ý an toàn.'],['Mẹo ghi nhớ','Viết mẹo ngắn gọn, kiểm tra tính chính xác và phạm vi áp dụng.']].map(([t,b])=><button type="button" key={t} onClick={()=>patch({html:p.html+'<h2>'+t+'</h2><p>'+b+'</p>'})}>+ {t}</button>)}
            </div>
            <RichEditor key={p.id+'-'+(p.html.match(/<h2>/g)||[]).length} value={p.html} onChange={html=>patch({html})}/>
          </section>

          {error&&<p role="alert" className="error">{error}</p>}
          <div className="sticky-actions actions">
            <button type="button" className="secondary" onClick={close}>Huỷ</button>
            <button className="primary" disabled={a.busy}><Save size={17}/>Lưu bài và tiết học</button>
          </div>
        </form>
      </div>
    </div>
  );
}
