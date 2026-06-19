import type { User } from "../types";

export const questionsCanLoad = (users: User[]): boolean =>
  users.length > 0 && users.every((u) => u.quizData.questionsShouldLoad);
