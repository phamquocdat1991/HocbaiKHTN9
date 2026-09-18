import test from 'node:test';import assert from 'node:assert/strict';
import {demoSchool} from '../src/content.js';import {newUser,mutate,xpOf} from '../src/domain.js';import {periodsOf,validatePeriods,mediaSource,safeUrl,calculateLessonProgress} from '../src/learning.js';import {sanitizeHTML} from '../server/sanitize.js';
const setup=()=>{const s=demoSchool(),l=s.lessons[0];l.periods=periodsOf(l);return {s,l,u:newUser('u','An','demo-class'),p:{lessonId:l.id,periodId:l.periods[0].id}}};
test('locked periods reject reading completion, quizzes and time',()=>{const {s,l,u,p}=setup();l.periods[0].unlocked=false;for(const action of ['periodComplete','periodQuiz','periodStudy'])assert.throws(()=>mutate(s,u,action,{...p,seconds:30,answers:{}}),/khoá/)});
test('completion requires passing grade calculated from source answers, not client score',()=>{let {s,l,u,p}=setup();assert.throws(()=>mutate(s,u,'periodComplete',p),/đạt điểm/);u=mutate(s,u,'periodQuiz',{...p,answers:{[l.question.id]:(l.question.correct+1)%4},score:10}).user;assert.equal(u.progress.periods[l.id+'/'+p.periodId].attempts[0].score,0);assert.throws(()=>mutate(s,u,'periodComplete',p));u=mutate(s,u,'periodQuiz',{...p,answers:{[l.question.id]:l.question.correct}}).user;u=mutate(s,u,'periodComplete',p).user;u=mutate(s,u,'periodComplete',p).user;assert.equal(xpOf(u),20)});
test('partial multi-period completion cannot award whole lesson XP',()=>{let {s,l,u,p}=setup();l.periods[0].quiz.required=false;l.periods.push({...structuredClone(l.periods[0]),id:'second',order:2});u=mutate(s,u,'periodComplete',p).user;assert.equal(xpOf(u),0);u=mutate(s,u,'periodComplete',{...p,periodId:'second'}).user;assert.equal(xpOf(u),20)});
test('retry limit, unanswered quiz, and time validation enforced',()=>{let {s,l,u,p}=setup();l.periods[0].quiz.maxAttempts=1;assert.throws(()=>mutate(s,u,'periodQuiz',{...p,answers:{}}));u=mutate(s,u,'periodQuiz',{...p,answers:{[l.question.id]:l.question.correct}}).user;assert.throws(()=>mutate(s,u,'periodQuiz',{...p,answers:{[l.question.id]:0}}),/hết lượt/);assert.throws(()=>mutate(s,u,'periodStudy',{...p,seconds:500}));u=mutate(s,u,'periodStudy',{...p,seconds:30}).user;assert.equal(u.progress.studySeconds,30)});
test('period schema rejects duplicate ordering and invalid question references',()=>{const {s,l}=setup();validatePeriods(l,s);l.periods.push(structuredClone(l.periods[0]));assert.throws(()=>validatePeriods(l,s));l.periods.pop();l.periods[0].quiz.questionIds=['missing'];assert.throws(()=>validatePeriods(l,s));});
test('HTTPS media normalization supports Shorts and rejects executable links',()=>{assert.equal(safeUrl('javascript:alert(1)'), '');assert.equal(safeUrl('https://user:pass@example.org'),'');assert.equal(mediaSource('https://youtube.com/shorts/abcdefghijk?feature=share').url,'https://www.youtube-nocookie.com/embed/abcdefghijk');assert.equal(mediaSource('https://example.org/lesson.mp4').kind,'video')});
test('Google Slides and Canva presentation URLs automatically transform to embedded players',()=>{const g1=mediaSource('https://docs.google.com/presentation/d/1x7wmmXzC1XAbplQjNuutFhykP4/edit?usp=sharing');assert.equal(g1.provider,'google-slides');assert.equal(g1.url,'https://docs.google.com/presentation/d/1x7wmmXzC1XAbplQjNuutFhykP4/embed?start=false&loop=false&delayms=3000');const g2=mediaSource('https://docs.google.com/presentation/d/1x7wmmXzC1XAbplQjNuutFhykP4/view#slide=id.p5');assert.equal(g2.url,'https://docs.google.com/presentation/d/1x7wmmXzC1XAbplQjNuutFhykP4/embed?start=false&loop=false&delayms=3000#slide=id.p5');const g3=mediaSource('https://docs.google.com/presentation/d/e/2PACX-1vTest/pub?start=false');assert.equal(g3.url,'https://docs.google.com/presentation/d/e/2PACX-1vTest/embed?start=false&loop=false&delayms=3000');const c1=mediaSource('https://www.canva.com/design/DAG12345/edit');assert.equal(c1.provider,'canva');assert.equal(c1.url,'https://www.canva.com/design/DAG12345/view?embed');const c2=mediaSource('https://www.canva.com/design/DAG12345/bai-giang-khtn9/view?utm_source=share');assert.equal(c2.url,'https://www.canva.com/design/DAG12345/bai-giang-khtn9/view?embed');const snippet=mediaSource('<iframe src="https://www.canva.com/design/DAG999/view?embed"></iframe>');assert.equal(snippet.url,'https://www.canva.com/design/DAG999/view?embed');const dr=mediaSource('https://drive.google.com/file/d/1DriveIdTest/view?usp=sharing');assert.equal(dr.provider,'google-drive');assert.equal(dr.url,'https://drive.google.com/file/d/1DriveIdTest/preview');});
test('rich text sanitizer removes executable markup and unsafe style',()=>{const x=sanitizeHTML('<h2 onclick="alert(1)">Năng lượng</h2><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">x</a><div style="position:fixed;background-image:url(https://evil.test)">y</div><table><tr><td>10 J</td></tr></table>');assert.ok(x.includes('<h2>Năng lượng</h2>'));assert.ok(x.includes('<td>10 J</td>'));assert.ok(!/script|onclick|onerror|javascript|position|evil/.test(x))});

test('lesson progress: 80% max for media completion and 20% for 10 reinforcement questions', () => {
  let { s, l, u, p } = setup();
  // Initial progress is 0%
  let prog = calculateLessonProgress(u, l, s);
  assert.equal(prog.totalPercent, 0);
  assert.equal(prog.mediaPercent, 0);
  assert.equal(prog.quizPercent, 0);

  // Complete media: should reach 80%
  u = mutate(s, u, 'periodMediaComplete', { lessonId: l.id, periodId: p.periodId, completed: true }).user;
  prog = calculateLessonProgress(u, l, s);
  assert.equal(prog.mediaPercent, 80);
  assert.equal(prog.quizPercent, 0);
  assert.equal(prog.totalPercent, 80);
  assert.equal(u.progress.completed.includes(l.id), false);

  // Complete 10 questions quiz
  assert.equal(l.questions.length, 10);
  const answers = Object.fromEntries(l.questions.map(q => [q.id, q.correct]));
  u = mutate(s, u, 'periodQuiz', { ...p, answers }).user;
  prog = calculateLessonProgress(u, l, s);
  assert.equal(prog.mediaPercent, 80);
  assert.equal(prog.quizPercent, 20);
  assert.equal(prog.totalPercent, 100);

  // Lesson should be automatically completed and 20 XP awarded when total reaches 100%
  assert.ok(u.progress.completed.includes(l.id));
  assert.equal(xpOf(u), 20);
});
