import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lessons } from '../src/content.js';
import { extraQuestions1 } from './questions-data-1.js';
import { extraQuestions2 } from './questions-data-2.js';
import { extraQuestions3 } from './questions-data-3.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allExtras = {
  ...extraQuestions1,
  ...extraQuestions2,
  ...extraQuestions3
};

const lessonQuestionsMap = {};
let totalQuestions = 0;

for (const l of lessons) {
  const extras = allExtras[l.id];
  if (!extras || extras.length !== 9) {
    throw new Error(`Lesson ${l.id} has ${extras ? extras.length : 0} extra questions (expected 9)`);
  }

  // Question 1 is the existing question
  const q1 = {
    ...l.question,
    id: l.question?.id || `kntt9-q-${l.number}`,
    lessonId: l.id,
    topic: l.topic
  };

  const list = [q1];

  extras.forEach((ex, idx) => {
    list.push({
      id: `kntt9-q-${l.number}-${idx + 2}`,
      lessonId: l.id,
      topic: l.topic,
      text: ex.text,
      options: ex.options,
      correct: ex.correct,
      explanation: ex.explanation,
      level: ex.level || 'Thông hiểu'
    });
  });

  if (list.length !== 10) {
    throw new Error(`Lesson ${l.id} does not have 10 questions (got ${list.length})`);
  }

  // Validate each question
  for (const q of list) {
    if (!q.text || !Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Invalid options for question in ${l.id}: ${q.text}`);
    }
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
      throw new Error(`Invalid correct index for question in ${l.id}: ${q.correct}`);
    }
    if (!q.explanation) {
      throw new Error(`Missing explanation for question in ${l.id}: ${q.text}`);
    }
  }

  lessonQuestionsMap[l.id] = list;
  totalQuestions += list.length;
}

console.log(`Successfully prepared ${totalQuestions} questions across ${Object.keys(lessonQuestionsMap).length} lessons!`);

const outputFilePath = path.resolve(__dirname, '../src/lesson-questions.js');
const fileHeader = `// 510 câu hỏi củng cố kiến thức cho 51 bài học KHTN 9 (Kết nối tri thức với cuộc sống)
// Mỗi bài học có đúng 10 câu hỏi củng cố (4 phương án, đáp án và giải thích chi tiết)
export const lessonQuestionsMap = ${JSON.stringify(lessonQuestionsMap, null, 2)};
`;

fs.writeFileSync(outputFilePath, fileHeader, 'utf-8');
console.log(`Written to ${outputFilePath}`);
