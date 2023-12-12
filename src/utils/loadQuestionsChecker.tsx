import { User } from "../ts/types/appTypes";

export const questionsCanLoad = (users: User[]) =>
  users.every((user) => user.quizData.questionsShouldLoad === true);
