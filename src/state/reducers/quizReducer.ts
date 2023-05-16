import { InitialState } from "./../../ts/interfaces/app_interfaces";
import { ActionType } from "../action-types/index";
import { Action } from "../actions";

const initialState = {
  quiz_mode: "",
  quiz_mode_is_set: false,
  players_mode: "",
  players_mode_is_set: false,
  is_form_valid: false,
  number_of_players: 0,
  number_of_questions: 10,
  actual_user_id: 1,
  users: [],
};

const reducer = (state: InitialState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.RESET_STORE:
      return {
        quiz_mode: "",
        quiz_mode_is_set: false,
        players_mode: "",
        players_mode_is_set: false,
        is_form_valid: false,
        number_of_players: 0,
        number_of_questions: 10,
        actual_user_id: 1,
        users: [],
      };
    case ActionType.SET_SINGLE_PLAYER_MODE:
      return {
        ...state,
        players_mode: "single_player",
        players_mode_is_set: true,
        number_of_players: 1,
      };
    case ActionType.SET_MULTI_PLAYER_MODE:
      return {
        ...state,
        players_mode: "multi_player",
        players_mode_is_set: true,
      };
    case ActionType.SELECT_NUMBER_OF_PLAYERS:
      if (!action.payload) {
        return {
          ...state,
          players_mode: "",
          players_mode_is_set: false,
          number_of_players: action.payload,
        };
      } else {
        return {
          ...state,
          players_mode: "multi_player",
          players_mode_is_set: true,
          number_of_players: action.payload,
        };
      }
    case ActionType.ADD_USER_NAME:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case ActionType.SET_IS_FORM_VALID:
      return {
        ...state,
        is_form_valid: action.payload,
      };
    case ActionType.CLEAR_USERS_ARRAY:
      return {
        ...state,
        users: action.payload,
      };
    case ActionType.SET_QUIZ_MODE:
      return {
        ...state,
        quiz_mode: action.payload,
      };
    case ActionType.SET_IS_QUIZ_MODE_SET:
      return {
        ...state,
        quiz_mode_is_set: action.payload,
      };
    case ActionType.SET_PLAYER_QUIZ_DATA:
      return {
        ...state,
        users: [
          ...state.users,
          (state.users[action.payload.userId - 1].quiz_data.selectedCategories =
            action.payload.selectedCategories),
          (state.users[
            action.payload.userId - 1
          ].quiz_data.questionsShouldLoad = action.payload.questionsShouldLoad),
        ].splice(0, state.users.length),
      };
    case ActionType.SET_QUESTIONS_SHOULD_LOAD:
      return {
        ...state,
        users: [
          ...state.users,
          (state.users[
            action.payload.userId - 1
          ].quiz_data.questionsShouldLoad = action.payload.questionsShouldLoad),
        ].splice(0, state.users.length),
      };
    case ActionType.SET_QUESTIONS_FOR_EACH_USER:
      return {
        ...state,
        users: [
          ...state.users,
          (state.users[action.payload.userId - 1].quiz_data.allQuestions =
            action.payload.allQuestions),
        ].splice(0, state.users.length),
      };
    case ActionType.RESET_USER_CATEGORIES:
      return {
        ...state,
        users: [
          ...state.users,
          (state.users[action.payload.userId - 1].quiz_data.selectedCategories =
            []),
        ].splice(0, state.users.length),
      };
    case ActionType.SET_ACTUAL_USER_ID:
      return {
        ...state,
        actual_user_id: action.payload,
      };
    case ActionType.COUNT_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
