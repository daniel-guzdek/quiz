import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";

export const resetStore = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESET_STORE,
    });
  };
};

export const setSinglePlayerMode = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SINGLE_PLAYER_MODE,
    });
  };
};

export const setMultiPlayerMode = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_MULTI_PLAYER_MODE,
    });
  };
};

export const setNumberOfPlayers = (number_of_players: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SELECT_NUMBER_OF_PLAYERS,
      payload: { number_of_players: number_of_players },
    });
  };
};

export const addUserName = (id: number, name: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_USER_NAME,
      payload: { id: id, name: name },
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

export const setIsFormValid = (is_form_valid: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_FORM_VALID,
      payload: { is_form_valid },
    });
  };
};

export const setQuizMode = (quiz_mode: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_QUIZ_MODE,
      payload: { quiz_mode },
    });
  };
};

export const setIsQuizModeSet = (quiz_mode_is_set: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_QUIZ_MODE_SET,
      payload: { quiz_mode_is_set },
    });
  };
};