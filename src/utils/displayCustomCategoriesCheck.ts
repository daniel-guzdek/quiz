import { User } from "../ts/types/appTypes";
import { setOtherPlayerId } from "./setOtherPlayerId";

export const displayCustomCategoriesCheck = (
  playerId: number,
  renderForPlayerId: number,
  users: User[]
) => {
  if (playerId === 0) {
    console.log("render for First Player");
    return "flex";
  } else return "flex";
};
