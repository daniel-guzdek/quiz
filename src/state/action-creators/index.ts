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

export const setSinglePlayerMode = (usersNum: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SINGLE_PLAYER_MODE,
      payload: { usersNum },
    });
  };
};

export const setMultiPlayerMode = (usersNum: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_MULTI_PLAYER_MODE,
      payload: { usersNum },
    });
  };
};

export const setNumberOfPlayers = (usersNum: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SELECT_NUMBER_OF_PLAYERS,
      payload: { usersNum },
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
          selectedCatg: [],
          questions: [],
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

export const setIsConfigReady = (isConfigReady: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_CONFIG_READY,
      payload: { isConfigReady },
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

export const setPlayerQuizData = (userId: number, selectedCatg: Category[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_PLAYER_QUIZ_DATA,
      payload: {
        userId: userId,
        selectedCatg: selectedCatg,
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
  questions: Question[]
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_QUESTIONS_FOR_EACH_USER,
      payload: {
        userId,
        questions,
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

export const resetUserCatg = (userId: number, users: User[]) => {
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

export const addCorrectAnswerScore = (userId: number, amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_CORRECT_ANSWER_SCORE,
      payload: {
        userId,
        amount,
      },
    });
  };
};

export const addIncorrectAnswerScore = (userId: number, amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_INCORRECT_ANSWER_SCORE,
      payload: {
        userId,
        amount,
      },
    });
  };
};
