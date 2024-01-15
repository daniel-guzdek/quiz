import { InitialState } from "../../ts/interfaces/appInterfaces";
import { ActionType } from "../action-types/index";
import { Action } from "../actions";

const initialState: InitialState = {
  quizMode: "",
  isQuizModeSet: false,
  usersMode: "",
  isPlayersModeSet: false,
  isFormValid: false,
  isConfigReady: false,
  usersNum: 0,
  actualUserId: 1,
  users: [],
};

const reducer = (
  state: InitialState = initialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case ActionType.RESET_STORE:
      return initialState;
    case ActionType.SET_SINGLE_PLAYER_MODE:
      return {
        ...state,
        usersMode: "Single Player",
        isPlayersModeSet: true,
        usersNum: 1,
      };
    case ActionType.SET_MULTI_PLAYER_MODE:
      return {
        ...state,
        usersMode: "Multi Player",
        isPlayersModeSet: true,
        usersNum: 2,
      };
    case ActionType.SELECT_NUMBER_OF_PLAYERS:
      return {
        ...state,
        usersMode: action.payload ? "Multi Player" : "",
        isPlayersModeSet: !!action.payload,
        usersNum: action.payload,
      };
    case ActionType.ADD_USER_NAME:
      return { ...state, users: [...state.users, action.payload] };
    case ActionType.SET_IS_FORM_VALID:
      return { ...state, isFormValid: action.payload };
    case ActionType.SET_IS_CONFIG_READY:
      return { ...state, isConfigReady: action.payload };
    case ActionType.CLEAR_USERS_ARRAY:
      return { ...state, users: action.payload };
    case ActionType.SET_QUIZ_MODE:
      return {
        ...state,
        quizMode: action.payload.quizMode,
        isQuizModeSet: action.payload.isQuizModeSet,
      };
    case ActionType.SET_PLAYER_QUIZ_DATA:
    case ActionType.SET_QUESTIONS_SHOULD_LOAD:
    case ActionType.SET_QUESTIONS_FOR_EACH_USER:
    case ActionType.RESET_USER_CATEGORIES:
      return {
        ...state,
        users: state.users.map((user, index) =>
          index === action.payload.userId - 1
            ? { ...user, quizData: { ...user.quizData, ...action.payload } }
            : user
        ),
      };
    case ActionType.SET_ACTUAL_USER_ID:
      return { ...state, actualUserId: action.payload };
    case ActionType.ADD_CORRECT_ANSWER_SCORE:
    case ActionType.ADD_INCORRECT_ANSWER_SCORE:
      return {
        ...state,
        users: state.users.map((user, index) =>
          index === action.payload.userId - 1
            ? { ...user, [action.type]: action.payload.amount }
            : user
        ),
      };
    default:
      return state;
  }
};

export default reducer;
