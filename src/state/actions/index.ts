import { Category, Question, User } from "../../ts/types/appTypes";
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
  payload: { numOfPlayers: number };
}

interface SetIsFormValidAction {
  type: ActionType.SET_IS_FORM_VALID;
  payload: { isFormValid: boolean };
}

interface AddUserNameAction {
  type: ActionType.ADD_USER_NAME;
  payload: {
    id: number;
    name: string;
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
    totalAnswers: number;
    isWinner: boolean;
    quizData: {
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
  payload: { quizMode: string; isQuizModeSet: boolean };
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

interface SetActualUserIdAction {
  type: ActionType.SET_ACTUAL_USER_ID;
  payload: { userId: number };
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
  | SetPlayerQuizDataAction
  | SetQuestionsShouldLoad
  | SetQuestionsForEachUser
  | ResetUserCategories
  | SetActualUserIdAction
  | CountScoreAction;
