import { Dispatch } from "redux";
import { Category, Question, User } from "../../ts/types/appTypes";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";

export const resetStore = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESET_STORE,
    });
  };
};

export const setSinglePlayerMode = (numOfPlayers: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SINGLE_PLAYER_MODE,
      payload: { numOfPlayers },
    });
  };
};

export const setMultiPlayerMode = (numOfPlayers: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_MULTI_PLAYER_MODE,
      payload: { numOfPlayers },
    });
  };
};

export const setNumberOfPlayers = (numOfPlayers: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SELECT_NUMBER_OF_PLAYERS,
      payload: { numOfPlayers },
    });
  };
};

export const addUserName = (id: number, name: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_USER_NAME,
      payload: {
        id: id,
        name: name,
        score: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalAnswers: 0,
        isWinner: false,
        quizData: {
          questionsShouldLoad: false,
          selectedCategories: [],
          allQuestions: [],
        },
      },
    });
  };
};

export const clearUserArray = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLEAR_USERS_ARRAY,
      payload: [],
    });
  };
};

export const setIsFormValid = (isFormValid: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_FORM_VALID,
      payload: { isFormValid },
    });
  };
};

export const setQuizMode = (quizMode: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_QUIZ_MODE,
      payload: { quizMode, isQuizModeSet: true },
    });
  };
};

export const setPlayerQuizData = (
  userId: number,
  selectedCategories: Category[]
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_PLAYER_QUIZ_DATA,
      payload: {
        userId: userId,
        selectedCategories: selectedCategories,
        questionsShouldLoad: true,
      },
    });
  };
};

export const setQuestionsShouldLoad = (
  userId: number,
  questionsShouldLoad: boolean
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_QUESTIONS_SHOULD_LOAD,
      payload: { userId: userId, questionsShouldLoad },
    });
  };
};

export const setQuestionsForEachUser = (
  userId: number,
  allQuestions: Question[]
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_QUESTIONS_FOR_EACH_USER,
      payload: {
        userId,
        allQuestions,
      },
    });
  };
};

export const setActualUserId = (userId: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_ACTUAL_USER_ID,
      payload: { userId },
    });
  };
};

export const resetUserCategories = (userId: number, users: User[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESET_USER_CATEGORIES,
      payload: {
        userId,
        users,
      },
    });
  };
};
