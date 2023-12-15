import { User } from "../ts/types/appTypes";

export const displayDefaultCatgCheck = (
  userId: number,
  players: User[],
  questionsShouldLoad: boolean
) => {
  if (players[userId - 2] === undefined && !questionsShouldLoad) {
    return "flex";
  } else if (questionsShouldLoad) {
    return "none";
  } else if (players[userId - 2].quizData.questionsShouldLoad) {
    return "flex";
  } else if (!players[userId - 2].quizData.questionsShouldLoad) {
    return "none";
  }
};
