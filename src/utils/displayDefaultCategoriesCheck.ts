import { User } from "../ts/types/appTypes";

export const displayDefaultCategoriesCheck = (
  playerId: number,
  players: User[],
  questionsShouldLoad: boolean
) => {
  if (players[playerId - 2] === undefined && !questionsShouldLoad) {
    return "flex";
  } else if (questionsShouldLoad) {
    return "none";
  } else if (players[playerId - 2].quizData.questionsShouldLoad) {
    return "flex";
  } else if (!players[playerId - 2].quizData.questionsShouldLoad) {
    return "none";
  }
};
