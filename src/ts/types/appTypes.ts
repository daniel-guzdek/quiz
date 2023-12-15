export type User = {
  id: number;
  name: string;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalAnswers: number;
  isWinner: boolean;
  quizData: {
    questionsShouldLoad: boolean;
    selectedCatg: Category[];
    allQuestions: Question[] | [];
  };
};

export type Question = {
  category: string;
  correctAnswer: string;
  difficulty: string;
  incorrectAnswers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[] };

export type Category = {
  id: number;
  name: string;
  questions: Question[];
};

export type SelectedCatg = Category[];
