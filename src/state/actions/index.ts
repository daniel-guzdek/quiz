import { Category, Question, User } from "../../ts/types/app_types";
import { ActionType } from "../action-types/index";

interface ResetStoreAction {
  type: ActionType.RESET_STORE;
}

interface SetSinglePlayerModeAction {
  type: ActionType.SET_SINGLE_PLAYER_MODE;
}

interface SetMultiPlayerModeAction {
  type: ActionType.SET_MULTI_PLAYER_MODE;
}

interface SetNumberOfPlayersAction {
  type: ActionType.SELECT_NUMBER_OF_PLAYERS;
  payload: { number_of_players: number };
}

interface SetIsFormValidAction {
  type: ActionType.SET_IS_FORM_VALID;
  payload: { is_form_valid: boolean };
}

interface AddUserNameAction {
  type: ActionType.ADD_USER_NAME;
  payload: {
    id: number;
    name: string;
    score: number;
    correct_answers: number;
    incorrect_answers: number;
    total_answers: number;
    is_winner: boolean;
    quiz_data: {
      questionsShouldLoad: boolean;
      selectedCategories: [];
      allQuestions: [];
    };
  };
}

interface ClearUsersArrayAction {
  type: ActionType.CLEAR_USERS_ARRAY;
  payload: [];
}

interface SetQuizModeAction {
  type: ActionType.SET_QUIZ_MODE;
  payload: { quiz_mode: string };
}

interface SetIsQuizModeSetAction {
  type: ActionType.SET_IS_QUIZ_MODE_SET;
  payload: { quiz_mode_is_set: boolean };
}

interface SetPlayerQuizDataAction {
  type: ActionType.SET_PLAYER_QUIZ_DATA;
  payload: {
    userId: number;
    selectedCategories: Category[] | [];
    questionsShouldLoad: true;
  };
}

interface SetQuestionsShouldLoad {
  type: ActionType.SET_QUESTIONS_SHOULD_LOAD;
  payload: {
    userId: number;
    questionsShouldLoad: boolean;
  };
}

interface SetQuestionsForEachUser {
  type: ActionType.SET_QUESTIONS_FOR_EACH_USER;
  payload: {
    userId: number;
    allQuestions: Question[];
  };
}

interface ResetUserCategories {
  type: ActionType.RESET_USER_CATEGORIES;
  payload: {
    userId: number;
    users: User[];
  };
}

interface CountScoreAction {
  type: ActionType.COUNT_SCORE;
  payload: { amount: number };
}

export type Action =
  | ResetStoreAction
  | SetSinglePlayerModeAction
  | SetMultiPlayerModeAction
  | SetNumberOfPlayersAction
  | SetIsFormValidAction
  | AddUserNameAction
  | ClearUsersArrayAction
  | SetQuizModeAction
  | SetIsQuizModeSetAction
  | SetPlayerQuizDataAction
  | SetQuestionsShouldLoad
  | SetQuestionsForEachUser
  | ResetUserCategories
  | CountScoreAction;
