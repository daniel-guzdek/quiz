export type User = {
  id: number;
  name: string;
  score: number;
  correct_answers: number;
  incorrect_answers: number;
  total_answers: number;
  is_winner: boolean;
  quiz_data: {
    questionsShouldLoad: boolean;
    selectedCategories: Category[];
    allQuestions: Question[] | [];
  };
};

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[] };

export type Category = {
  id: number;
  name: string;
  questions: Question[];
};

export type SelectedCategories = Category[];
