import test from 'node:test';
import assert from 'node:assert/strict';
import {demoSchool,questions as allQuestions} from '../src/content.js';
import {lessonQuestionsMap} from '../src/lesson-questions.js';
import {newUser,mutate} from '../src/domain.js';
import {periodsOf,validatePeriods} from '../src/learning.js';

test('every lesson has exactly 10 reinforcement questions with full options and explanations', () => {
  const lessonIds = Object.keys(lessonQuestionsMap);
  assert.equal(lessonIds.length, 51, 'Must cover all 51 lessons in KNTT 9');

  for (const id of lessonIds) {
    const qs = lessonQuestionsMap[id];
    assert.equal(qs.length, 10, `Lesson ${id} must have exactly 10 reinforcement questions`);
    for (const [idx, q] of qs.entries()) {
      assert.ok(q.id, `Question ${idx + 1} of ${id} has valid id`);
      assert.equal(q.lessonId, id, `Question ${q.id} matches lessonId`);
      assert.ok(q.text && q.text.length > 5, `Question ${q.id} has text`);
      assert.equal(Array.isArray(q.options), true, `Question ${q.id} options is array`);
      assert.equal(q.options.length, 4, `Question ${q.id} has 4 options`);
      assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3, `Question ${q.id} has valid correct option (0-3)`);
      assert.ok(q.explanation && q.explanation.length > 10, `Question ${q.id} has suggested answer explanation`);
      assert.ok(['Nhận biết', 'Thông hiểu', 'Vận dụng'].includes(q.level), `Question ${q.id} has pedagogical level`);
    }
  }
});

test('inserting 10 reinforcement questions into a period passes period validation and enables quiz', () => {
  const s = demoSchool();
  const lesson = s.lessons[0];
  const qs = lessonQuestionsMap[lesson.id];
  assert.equal(qs.length, 10);

  const ps = periodsOf(lesson);
  ps[0].quiz = {
    enabled: true,
    required: true,
    passScore: 5,
    maxAttempts: 0,
    questionIds: qs.map(q => q.id)
  };
  lesson.periods = ps;

  // Validate periods should pass cleanly without throwing
  assert.doesNotThrow(() => validatePeriods(lesson, s));
  assert.equal(lesson.periods[0].quiz.questionIds.length, 10);
});

test('submitting 10 questions stores feedback with correct answers and explanations for post-quiz review', () => {
  const s = demoSchool();
  const lesson = s.lessons[0];
  const qs = lessonQuestionsMap[lesson.id];
  lesson.periods = periodsOf(lesson);
  lesson.periods[0].quiz = {
    enabled: true,
    required: true,
    passScore: 5,
    maxAttempts: 0,
    questionIds: qs.map(q => q.id)
  };

  let u = newUser('std-1', 'Bảo Nam', 'demo-class');
  const answers = {};
  // Answer 8 correctly and 2 incorrectly
  for (let i = 0; i < qs.length; i++) {
    if (i < 8) {
      answers[qs[i].id] = qs[i].correct;
    } else {
      answers[qs[i].id] = (qs[i].correct + 1) % 4;
    }
  }

  const result = mutate(s, u, 'periodQuiz', {
    lessonId: lesson.id,
    periodId: lesson.periods[0].id,
    answers
  });
  u = result.user;

  const rec = u.progress.periods[lesson.id + '/' + lesson.periods[0].id];
  assert.ok(rec, 'Period progress record created');
  assert.equal(rec.attempts.length, 1, 'Attempt recorded');
  const att = rec.attempts[0];
  assert.equal(att.score, 8, 'Score should be 8.0 / 10');
  assert.ok(Array.isArray(att.feedback), 'Feedback array exists');
  assert.equal(att.feedback.length, 10, 'Feedback has 10 question explanations');

  for (const fb of att.feedback) {
    const originalQ = qs.find(q => q.id === fb.id);
    assert.ok(originalQ);
    assert.equal(fb.correct, originalQ.correct);
    assert.equal(fb.explanation, originalQ.explanation);
  }
});
