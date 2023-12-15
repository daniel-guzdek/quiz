import { User } from "../ts/types/appTypes";

export const renderInfo = (
  userId: number,
  playerName: string | undefined,
  users: User[]
) => {
  switch (true) {
    case users.length % 2 === 1 && userId === users.length:
      return `${playerName}, AI will select catg for you`;
    case userId === 1:
      return `${playerName}, please select Catg for ${users[userId].name}`;
    case userId === 2:
      return `${playerName}, please select Catg for ${users[userId - 2].name}`;
    case userId === 3:
      return `${playerName}, please select Catg for ${users[userId].name}`;
    case userId === 4:
      return `${playerName}, please select Catg for ${users[userId - 2].name}`;
    case userId === 5:
      return `${playerName}, AI will select catg for you`;
    default:
      return null;
  }
};
