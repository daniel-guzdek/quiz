export type Difficulty = "easy" | "medium" | "hard";

export type Category = {
  id: number;
  name: string;
  color: string;
};

export type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: Difficulty;
  type: string;
};

export type UserQuizData = {
  selectedCategories: Category[];
  questions: Question[];
  questionsShouldLoad: boolean;
};

export type User = {
  id: number;
  name: string;
  correctAnswers: number;
  incorrectAnswers: number;
  quizData: UserQuizData;
};

export type QuizMode =
  | "MY THING"
  | "MY THING VS. MY THING"
  | "OMNIBUS"
  | "ON THE EDGE";

export type PlayersMode = "Single Player" | "Multi Player" | "";

export interface QuizState {
  quizMode: QuizMode | "";
  isQuizModeSet: boolean;
  playersMode: PlayersMode;
  isPlayersModeSet: boolean;
  isFormValid: boolean;
  isConfigReady: boolean;
  isGameOver: boolean;
  usersNum: number;
  activeUserId: number;
  users: User[];
}
