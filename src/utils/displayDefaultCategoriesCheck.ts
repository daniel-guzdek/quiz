import { User } from "./../ts/types/app_types";

export const displayDefaultCategoriesCheck = (
  playerId: number,
  players: User[],
  questionsShouldLoad: boolean
) => {
  if (players[playerId - 2] === undefined && !questionsShouldLoad) {
    return "flex";
  } else if (questionsShouldLoad) {
    return "none";
  } else if (players[playerId - 2].quiz_data.questionsShouldLoad) {
    return "flex";
  } else if (!players[playerId - 2].quiz_data.questionsShouldLoad) {
    return "none";
  }
};
