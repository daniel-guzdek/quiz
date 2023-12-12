import { User } from "../types/appTypes";

export interface InitialState {
  quizMode: string;
  isQuizModeSet: boolean;
  playersMode: string;
  isPlayersModeSet: boolean;
  isFormValid: boolean;
  numOfPlayers: number;
  numOfQuestions: number;
  users: Array<User>;
}

export interface GameMode {
  variant: string;
  icon: string;
  isSinglePlayerMode: boolean;
  isMultiPlayerMode: boolean;
}
