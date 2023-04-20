import { User } from "../types/app_types";

export interface InitialState {
  quiz_mode: string;
  quiz_mode_is_set: boolean;
  players_mode: string;
  players_mode_is_set: boolean;
  is_form_valid: boolean;
  number_of_players: number;
  number_of_questions: number;
  users: Array<User>;
}

export interface GameMode {
  variant: string;
  icon: string;
  isSinglePlayerMode: boolean;
  isMultiPlayerMode: boolean;
}
