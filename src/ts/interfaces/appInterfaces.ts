import { User } from "../types/appTypes";

export interface InitialState {
  quizMode: string;
  isQuizModeSet: boolean;
  usersMode: string;
  isPlayersModeSet: boolean;
  isFormValid: boolean;
  isConfigReady: boolean;
  usersNum: number;
  actualUserId: number;
  users: Array<User>;
}

export interface GameMode {
  variant: string;
  icon: string;
  isSinglePlayerMode: boolean;
  isMultiPlayerMode: boolean;
}
