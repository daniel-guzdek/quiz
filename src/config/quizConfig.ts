import React from "react";
import { GiHorseHead, GiAxeSword, GiBookmark } from "react-icons/gi";
import type { Category, QuizMode } from "../types";

export const QUESTIONS_PER_PLAYER = 5;

export const AVAILABLE_CATEGORIES: Category[] = [
  { id: 10, name: "Books", color: "#e65100" },
  { id: 11, name: "Film", color: "#1a1a2e" },
  { id: 12, name: "Music", color: "#6a1b9a" },
  { id: 13, name: "Musicals & Theater", color: "#555" },
  { id: 17, name: "Science & Nature", color: "#2e7d32" },
  { id: 18, name: "Technology", color: "#0277bd" },
  { id: 20, name: "Mythology", color: "#880e4f" },
  { id: 21, name: "Sports", color: "#1565c0" },
  { id: 22, name: "Geography", color: "#00838f" },
  { id: 23, name: "History", color: "#795548" },
  { id: 27, name: "Animals", color: "#558b2f" },
];

export interface QuizModeConfig {
  id: number;
  variant: QuizMode;
  icon: React.ReactNode;
  isSinglePlayerMode: boolean;
  isMultiPlayerMode: boolean;
  description: string;
}

export const QUIZ_MODES: QuizModeConfig[] = [
  {
    id: 1,
    variant: "MY THING",
    icon: React.createElement(GiHorseHead),
    isSinglePlayerMode: true,
    isMultiPlayerMode: false,
    description: "Answer questions from your chosen subject",
  },
  {
    id: 2,
    variant: "MY THING VS. MY THING",
    icon: React.createElement(
      "span",
      { style: { display: "flex", gap: 4 } },
      React.createElement(GiHorseHead),
      React.createElement(GiHorseHead, { style: { transform: "scaleX(-1)" } }),
    ),
    isSinglePlayerMode: false,
    isMultiPlayerMode: true,
    description: "Each player picks their own subject",
  },
  {
    id: 3,
    variant: "OMNIBUS",
    icon: React.createElement(GiBookmark),
    isSinglePlayerMode: true,
    isMultiPlayerMode: true,
    description: "Random questions from all available subjects",
  },
  {
    id: 4,
    variant: "ON THE EDGE",
    icon: React.createElement(GiAxeSword),
    isSinglePlayerMode: false,
    isMultiPlayerMode: true,
    description: "Pick a subject category for your opponent",
  },
];
