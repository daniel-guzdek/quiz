import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Category, Question, QuizMode, QuizState, User } from "../types";

const initialState: QuizState = {
  quizMode: "",
  isQuizModeSet: false,
  playersMode: "",
  isPlayersModeSet: false,
  isFormValid: false,
  isConfigReady: false,
  isGameOver: false,
  usersNum: 0,
  activeUserId: 1,
  users: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetStore: () => initialState,

    setSinglePlayerMode: (state) => {
      state.playersMode = "Single Player";
      state.isPlayersModeSet = true;
      state.usersNum = 1;
    },

    setMultiPlayerMode: (state) => {
      state.playersMode = "Multi Player";
      state.isPlayersModeSet = true;
      state.usersNum = 2;
    },

    setNumberOfPlayers: (state, action: PayloadAction<number>) => {
      state.usersNum = action.payload;
      state.playersMode = action.payload > 1 ? "Multi Player" : "Single Player";
      state.isPlayersModeSet = !!action.payload;
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    clearUsers: (state) => {
      state.users = [];
    },

    setIsFormValid: (state, action: PayloadAction<boolean>) => {
      state.isFormValid = action.payload;
    },

    setIsConfigReady: (state, action: PayloadAction<boolean>) => {
      state.isConfigReady = action.payload;

      if (action.payload) {
        state.activeUserId = 1;
      }
    },

    setQuizMode: (state, action: PayloadAction<QuizMode>) => {
      state.quizMode = action.payload;
      state.isQuizModeSet = true;
    },

    setUserCategories: (
      state,
      action: PayloadAction<{
        userId: number;
        categories: Category[];
        questionsShouldLoad: boolean;
      }>,
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.quizData.selectedCategories = action.payload.categories;
        user.quizData.questionsShouldLoad = action.payload.questionsShouldLoad;
      }
    },

    setUserQuestions: (
      state,
      action: PayloadAction<{ userId: number; questions: Question[] }>,
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.quizData.questions = action.payload.questions;
        user.quizData.questionsShouldLoad = true;
      }
    },

    resetUserCategories: (state, action: PayloadAction<number>) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.quizData.selectedCategories = [];
        user.quizData.questionsShouldLoad = false;
        user.quizData.questions = [];
      }
    },

    setActiveUserId: (state, action: PayloadAction<number>) => {
      state.activeUserId = action.payload;
    },

    answerQuestion: (
      state,
      action: PayloadAction<{ userId: number; isCorrect: boolean }>,
    ) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        if (action.payload.isCorrect) {
          user.correctAnswers += 1;
        } else {
          user.incorrectAnswers += 1;
        }
      }
    },

    setGameOver: (state) => {
      state.isGameOver = true;
    },
  },
});

export const {
  resetStore,
  setSinglePlayerMode,
  setMultiPlayerMode,
  setNumberOfPlayers,
  addUser,
  clearUsers,
  setIsFormValid,
  setIsConfigReady,
  setQuizMode,
  setUserCategories,
  setUserQuestions,
  resetUserCategories,
  setActiveUserId,
  answerQuestion,
  setGameOver,
} = quizSlice.actions;

export default quizSlice.reducer;
