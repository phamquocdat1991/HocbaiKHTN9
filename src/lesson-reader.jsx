import React,{useState,useEffect,useRef} from 'react';
import {cleanHTML} from './html.js';
import {Check,Lock,PlayCircle,FileText,ExternalLink,Maximize,Minimize,Presentation,Globe,CheckCircle2,Sparkles,Film,RotateCcw} from 'lucide-react';
import {useApp} from './store.jsx';
import {periodsOf,periodQuestions,periodRecord,mediaSource,safeUrl,calculateLessonProgress} from './learning.js';

export function Media({media,title,onComplete,isCompleted}){
  const playerRef=useRef(null);
  const [isFs,setFs]=useState(false);
  const src=mediaSource(media?.url);

  useEffect(()=>{
    const handler=()=>setFs(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange',handler);
    return ()=>document.removeEventListener('fullscreenchange',handler);
  },[]);

  if(!media||media.type==='none'||!src)return null;
  const isSlide=media.type==='slides'||src.provider==='google-slides'||src.provider==='canva';
  const isVideo=media.type==='video'||src.kind==='video';
  const providerLabel=src.provider==='google-slides'?'Trình chiếu Google Slides':src.provider==='canva'?'Trình chiếu Canva':isSlide?'Bài giảng trình chiếu':isVideo?'Video bài giảng':media.type==='document'?'Tài liệu học tập':'Học liệu tương tác';
  const IconComp=isSlide?Presentation:isVideo?PlayCircle:media.type==='document'?FileText:Globe;

  const toggleFs=()=>{
    if(!playerRef.current)return;
    if(document.fullscreenElement){
      document.exitFullscreen().catch(()=>{});
    }else{
      playerRef.current.requestFullscreen().catch(()=>{});
    }
  };

  return (
    <div className={`lesson-media presentation-player ${isSlide?'is-slide':''}`} ref={playerRef}>
      <div className="media-header">
        <div className="media-tag">
          <IconComp size={17}/>
          <span>{providerLabel}</span>
          {title&&<span className="media-title-hint">· {title}</span>}
        </div>
        <div className="media-actions">
          {onComplete&&(
            <button
              type="button"
              className={`media-done-toggle ${isCompleted?'completed':''}`}
              onClick={onComplete}
              title={isCompleted?'Đã hoàn thành media':'Đánh dấu đã xem xong media (+80% tiến độ)'}
              aria-label="Đánh dấu hoàn thành media"
            >
              <CheckCircle2 size={15}/>
              <span>{isCompleted?'Đã xong media':'Xong media (+80%)'}</span>
            </button>
          )}
          <button type="button" onClick={toggleFs} title="Xem toàn màn hình" aria-label="Xem toàn màn hình">
            {isFs?<Minimize size={14}/>:<Maximize size={14}/>}
            <span>{isFs?'Thu nhỏ':'Toàn màn hình'}</span>
          </button>
          <a href={safeUrl(media.url)} target="_blank" rel="noopener noreferrer" title="Mở trong tab mới" aria-label="Mở trong tab mới">
            <ExternalLink size={14}/>
            <span>Mở tab mới</span>
          </a>
        </div>
      </div>
      <div className="media-frame-wrap">
        {src.kind==='video'?(
          <video controls preload="metadata" src={src.url} onEnded={onComplete}/>
        ):(
          <iframe title={title||providerLabel} src={src.url} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowFullScreen/>
        )}
      </div>
      <div className="media-footer">
        {isSlide?(
          <span>💡 <b>Mẹo trình chiếu:</b> Bấm <b>Toàn màn hình</b> để chiếu trên lớp hoặc dùng phím mũi tên chuyển slide.</span>
        ):(
          <span>💡 <b>Hướng dẫn học:</b> Hoàn thành tất cả media tiết học để nhận <b>tối đa 80%</b> tiến độ bài học.</span>
        )}
        {onComplete&&(
          <button type="button" className={`media-mark-btn ${isCompleted?'done':''}`} onClick={onComplete}>
            <CheckCircle2 size={16}/> {isCompleted?'✓ Đã hoàn thành media tiết này':'Đánh dấu đã xem xong media (+80% tiến độ)'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function LessonReader({id,focus,setFocus,go}){
  const a=useApp(),l=a.school.lessons.find(x=>x.id===id);
  const ps=l?periodsOf(l):[];
  const [selected,S]=useState(ps.find(p=>p.unlocked)?.id||ps[0]?.id),[answers,A]=useState({}),[size,Z]=useState('medium'),[theme,T]=useState('paper'),[showResult,R]=useState(false);
  const p=ps.find(p=>p.id===selected)||ps[0];

  useEffect(()=>{A({});R(false)},[selected,id]);

  useEffect(()=>{
    if(!p?.unlocked)return;
    const timer=setInterval(()=>{
      if(document.visibilityState==='visible'&&document.hasFocus())a.act('periodStudy',{lessonId:id,periodId:p.id,seconds:30}).catch(()=>{});
    },30000);
    return()=>clearInterval(timer);
  },[id,p?.id,p?.unlocked]);

  if(!l)return <div className="panel"><h2>Bài học không tồn tại</h2></div>;

  const record=periodRecord(a.user,l,p);
  const qs=periodQuestions(a.school,l,p);
  const last=record.attempts.at(-1);
  const passed=record.attempts.some(t=>t.score>=p.quiz.passScore);
  const allowed=!p.quiz.maxAttempts||record.attempts.length<p.quiz.maxAttempts;
  const progress=calculateLessonProgress(a.user,l,a.school);

  const toggleMediaCompletion=async()=>{
    try{
      await a.act('periodMediaComplete',{
        lessonId:id,
        periodId:p.id,
        mediaCompleted:!record.mediaCompleted
      });
    }catch{}
  };

  return (
    <div className={'reader '+theme+' '+size}>
      <div className="reader-toolbar">
        <button onClick={()=>go('/app/lessons')}>← Thư viện bài học</button>
        <div>
          <select aria-label="Cỡ chữ" value={size} onChange={e=>Z(e.target.value)}>
            <option value="small">Chữ nhỏ</option>
            <option value="medium">Chữ vừa</option>
            <option value="large">Chữ lớn</option>
          </select>
          <select aria-label="Nền đọc" value={theme} onChange={e=>T(e.target.value)}>
            <option value="paper">Nền sáng</option>
            <option value="sepia">Vàng dịu</option>
            <option value="dark">Nền tối</option>
          </select>
          <button onClick={()=>setFocus(!focus)}>
            <Maximize size={16}/>{focus?'Thoát tập trung':'Tập trung'}
          </button>
        </div>
      </div>

      {/* Modern Header with Segmented Completion Progress Bar (80% Media + 20% Quiz) */}
      <header className="learning-header">
        <div className="learning-header-top">
          <div>
            <span className="eyebrow">KẾT NỐI TRI THỨC VỚI CUỘC SỐNG · KHTN 9</span>
            <h1>{l.title}</h1>
          </div>
          <div className="lesson-progress-badge">
            <span className="badge-title">Tiến độ bài học</span>
            <span className="badge-num">{progress.totalPercent}%</span>
          </div>
        </div>

        {/* Dual-segment progress bar: 80% Media + 20% 10-Question Quiz */}
        <div className="dual-progress-container">
          <div className="dual-progress-labels">
            <div className={`prog-col media-col ${progress.mediaCompleted?'done':''}`}>
              <Film size={15}/>
              <span><b>1. Media tiết học:</b> {progress.mediaPercent}%/80% {progress.mediaCompleted?'✓ Đã hoàn thành tất cả':`(${progress.completedMedia}/${progress.totalMedia} media)`}</span>
            </div>
            <div className={`prog-col quiz-col ${progress.quizCompleted?'done':''}`}>
              <CheckCircle2 size={15}/>
              <span><b>2. 10 câu hỏi củng cố:</b> {progress.quizPercent}%/20% {progress.quizCompleted?`✓ Đã đạt ${progress.bestScore}/10 đ`:'(Chưa hoàn thành)'}</span>
            </div>
          </div>
          <div className="dual-progress-track" role="progressbar" aria-valuenow={progress.totalPercent} aria-valuemin="0" aria-valuemax="100">
            <div className="seg-media" style={{width:progress.mediaPercent+'%'}} title={`Tiến độ media: ${progress.mediaPercent}% / 80%`}/>
            <div className="seg-quiz" style={{width:progress.quizPercent+'%'}} title={`Tiến độ củng cố: ${progress.quizPercent}% / 20%`}/>
          </div>
        </div>

        {progress.totalPercent>=100?(
          <div className="celebrate-banner">
            <Sparkles size={18}/>
            <span><b>Chúc mừng em đã hoàn thành 100% bài học!</b> (80% Media + 20% Củng cố kiến thức) · +20 XP</span>
          </div>
        ):(
          <p className="progress-hint">
            💡 Hoàn thành tất cả media tiết học (tối đa 80%) và hoàn thành 10 câu hỏi củng cố (20%) để đạt 100% hoàn thành bài học.
          </p>
        )}
      </header>

      <div className="learning-layout">
        <aside className="period-outline">
          <h3>Lộ trình bài học</h3>
          {ps.map(t=>{
            const r=periodRecord(a.user,l,t);
            return (
              <button key={t.id} className={p.id===t.id?'active':''} onClick={()=>S(t.id)}>
                <span>
                  {!t.unlocked?<Lock size={17}/>:r.completed||r.mediaCompleted?<Check size={17}/>:t.order}
                </span>
                <div>
                  <b>{t.title}</b>
                  <small>
                    {t.minutes} phút · {!t.unlocked?'Đang khoá':r.mediaCompleted?'Đã xem media':r.completed?'Đã hoàn thành':'Sẵn sàng học'}
                  </small>
                </div>
              </button>
            );
          })}
        </aside>

        <article>
          {!p.unlocked?(
            <div className="locked-period">
              <Lock size={36}/>
              <h2>Tiết học đang khoá</h2>
              <p>Giáo viên sẽ mở tiết học khi lớp sẵn sàng.</p>
            </div>
          ):(
            <>
              <span className="eyebrow">TIẾT {p.order} · {p.minutes} PHÚT</span>
              <h2>{p.title}</h2>

              {/* Primary Media Player with Completion Action */}
              {p.media&&p.media.type!=='none'&&p.media.url?(
                <Media
                  key={p.id+p.media.url}
                  media={p.media}
                  title={p.title}
                  onComplete={toggleMediaCompletion}
                  isCompleted={Boolean(record.mediaCompleted)}
                />
              ):(
                <div className="no-media-box">
                  <div className="no-media-info">
                    <Film size={22}/>
                    <div>
                      <b>Nội dung lý thuyết & hoạt động khám phá</b>
                      <p>Đọc kĩ phần kiến thức trọng tâm và vận dụng bên dưới, sau đó xác nhận để nhận 80% tiến độ media/tiết học.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`media-mark-btn ${record.mediaCompleted?'done':''}`}
                    onClick={toggleMediaCompletion}
                  >
                    <CheckCircle2 size={16}/> {record.mediaCompleted?'✓ Đã học xong lý thuyết tiết này':'Xác nhận đã học xong lý thuyết (+80% tiến độ)'}
                  </button>
                </div>
              )}

              {p.attachments.length>0&&(
                <section className="resource-list">
                  <h3>Tài liệu đồng hành</h3>
                  {p.attachments.map((r,i)=>(
                    <a key={i} href={safeUrl(r.url)} target="_blank" rel="noopener noreferrer">
                      <FileText size={18}/>{r.title}<ExternalLink size={14}/>
                    </a>
                  ))}
                </section>
              )}

              <div className="reader-hook">
                <b>Cùng suy nghĩ</b>
                <p>{l.hook}</p>
              </div>

              {p.html?(
                <div className="rich-content lesson-html" dangerouslySetInnerHTML={{__html:cleanHTML(p.html)}}/>
              ):(
                <>
                  <h2>Kiến thức trọng tâm</h2>
                  {l.concepts.map((c,i)=>(
                    <div className="concept" key={i}>
                      <span>{i+1}</span>
                      <p>{c}</p>
                    </div>
                  ))}
                  <h2>Quan sát & vận dụng</h2>
                  <p>{l.activity}</p>
                </>
              )}

              {/* 10 Reinforcement Questions Section */}
              {p.quiz.enabled&&(
                <section className="period-quiz">
                  <div className="quiz-header-card">
                    <div>
                      <span className="eyebrow">CỦNG CỐ KIẾN THỨC BÀI HỌC</span>
                      <h2>10 Câu hỏi củng cố kiến thức ({qs.length} câu)</h2>
                      <p>Hoàn thành 10 câu hỏi để nhận <b>20% tiến độ hoàn thành</b> · Điểm đạt {p.quiz.passScore}/10 · {p.quiz.maxAttempts?'Còn '+Math.max(0,p.quiz.maxAttempts-record.attempts.length)+' lượt':'Được làm lại không giới hạn'}</p>
                    </div>
                    <div className="quiz-status-pill">
                      <span>Đã chọn: <b>{Object.keys(answers).length}/{qs.length}</b> câu</span>
                    </div>
                  </div>

                  {/* 10 Questions Jump Nav */}
                  <div className="quiz-nav-pills" aria-label="Bảng câu hỏi củng cố">
                    {qs.map((q,idx)=>(
                      <button
                        key={q.id}
                        type="button"
                        className={`q-pill ${answers[q.id]!==undefined?'answered':''}`}
                        onClick={()=>{
                          document.getElementById('quiz-q-'+q.id)?.scrollIntoView({behavior:'smooth',block:'center'});
                        }}
                      >
                        {idx+1}
                      </button>
                    ))}
                  </div>

                  {qs.map((q,i)=>(
                    <div className="quiz-question" id={'quiz-q-'+q.id} key={q.id}>
                      <div className="q-header">
                        <h3>{i+1}. {q.text}</h3>
                        {q.level&&<span className={`q-level ${q.level==='Vận dụng'?'high':q.level==='Thông hiểu'?'med':'low'}`}>{q.level}</span>}
                      </div>
                      <div className="options">
                        {q.options.map((o,j)=>(
                          <button
                            key={j}
                            disabled={a.busy||!allowed}
                            className={answers[q.id]===j?'chosen':''}
                            onClick={()=>{A({...answers,[q.id]:j});R(false)}}
                          >
                            <span>{'ABCD'[j]}</span>
                            {o}
                          </button>
                        ))}
                      </div>
                      {showResult&&last&&(
                        <div className="answer-feedback-card">
                          <p className="answer-note">
                            <b>Đáp án đúng: {'ABCD'[last.feedback.find(x=>x.id===q.id)?.correct]}</b> · {last.feedback.find(x=>x.id===q.id)?.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="quiz-submit-bar">
                    <div className="quiz-submit-info">
                      <span>Đã chọn: <b>{Object.keys(answers).length}/{qs.length}</b> câu</span>
                      {Object.keys(answers).length<qs.length&&<small>Em cần trả lời đầy đủ 10 câu để nộp bài.</small>}
                    </div>
                    <button
                      className="primary quiz-submit-btn"
                      disabled={a.busy||!allowed||qs.some(q=>answers[q.id]===undefined)}
                      onClick={async()=>{
                        try{
                          await a.act('periodQuiz',{lessonId:id,periodId:p.id,answers});
                          R(true);
                        }catch{}
                      }}
                    >
                      <CheckCircle2 size={18}/> Nộp bài 10 câu củng cố (+20% tiến độ)
                    </button>
                  </div>

                  {last&&(
                    <div className="quiz-result" role="status">
                      <div className="quiz-result-header">
                        <b>Kết quả củng cố: {last.score}/10 điểm</b>
                        <span className="badge-pct">+20% tiến độ hoàn thành</span>
                      </div>
                      <p>{passed?'🎉 Em đã đạt yêu cầu củng cố kiến thức! Chúc mừng em đã nhận 20% tiến độ.':'Hãy đọc lại phần kiến thức trọng tâm và thử làm lại để cải thiện điểm số.'}</p>
                      <small>Đã thực hiện {record.attempts.length} lượt làm bài củng cố.</small>
                    </div>
                  )}
                </section>
              )}

              <div className="reader-end">
                <div>
                  <b>{progress.totalPercent>=100||record.completed?'Em đã hoàn thành bài học này.':'Sẵn sàng hoàn tất bước học?'}</b>
                  <p>{p.quiz.required&&!passed?'Cần làm đạt bài củng cố để hoàn thành.':'Tiến độ đạt 100% khi hoàn thành tất cả media (80%) và 10 câu củng cố (20%).'}</p>
                </div>
                <button
                  className="primary"
                  disabled={a.busy||(progress.totalPercent>=100&&record.completed)}
                  onClick={()=>a.act('periodComplete',{lessonId:id,periodId:p.id}).catch(()=>{})}
                >
                  <Check size={17}/>{progress.totalPercent>=100||record.completed?'Đã hoàn thành bài học':'Hoàn thành tiết'}
                </button>
              </div>
            </>
          )}
        </article>
      </div>
    </div>
  );
}
