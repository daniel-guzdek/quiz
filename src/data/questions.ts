import db from "./db.json";
import type { Question } from "../types";

type RawQuestion = {
  id: number;
  catgId: number;
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const allRawQuestions: RawQuestion[] = (
  Object.values(db.data) as RawQuestion[][]
).flat();

const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const toQuestion = (raw: RawQuestion): Question => ({
  question: raw.question,
  correct_answer: raw.correct_answer,
  incorrect_answers: raw.incorrect_answers,
  category: raw.category,
  difficulty: raw.difficulty as Question["difficulty"],
  type: raw.type,
});

export const getQuestionsByCategoryId = (
  catgId: number,
  amount: number,
): Question[] =>
  shuffle(allRawQuestions.filter((q) => q.catgId === catgId))
    .slice(0, amount)
    .map(toQuestion);

export const getRandomQuestions = (amount: number): Question[] =>
  shuffle(allRawQuestions).slice(0, amount).map(toQuestion);
