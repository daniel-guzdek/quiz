import { User } from "../ts/types/app_types";

export const loadQuestionsChecker = (users: User[]) =>
  users.every((user) => user.quiz_data.questionsShouldLoad === true);
