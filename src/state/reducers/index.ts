import { combineReducers } from "redux";
import quizReducer from "./quizReducer";

const reducers = combineReducers({
  quiz: quizReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
