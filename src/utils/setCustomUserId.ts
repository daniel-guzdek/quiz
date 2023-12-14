import { User } from "../ts/types/appTypes";

export const setCustomUserId = (playerId: number, users: User[]): number => {
  switch (true) {
    case users.length % 2 === 1 && playerId === users.length:
      return playerId;
    case playerId === 1:
      return users[playerId].id;
    case playerId === 2:
      return users[playerId - 2].id;
    case playerId === 3:
      return users[playerId].id;
    case playerId === 4:
      return users[playerId - 2].id;
    case playerId === 5:
      return playerId;
    default:
      return playerId;
  }
};
