import { User } from "../ts/types/app_types";

export const renderInfo = (
  playerId: number,
  playerName: string | undefined,
  users: User[]
) => {
  switch (true) {
    case users.length % 2 === 1 && playerId === users.length:
      return `${playerName}, AI will select categories for you`;
    case playerId === 1:
      return `${playerName}, please select Categories for ${users[playerId].name}`;
    case playerId === 2:
      return `${playerName}, please select Categories for ${
        users[playerId - 2].name
      }`;
    case playerId === 3:
      return `${playerName}, please select Categories for ${users[playerId].name}`;
    case playerId === 4:
      return `${playerName}, please select Categories for ${
        users[playerId - 2].name
      }`;
    case playerId === 5:
      return `${playerName}, AI will select categories for you`;
    default:
      return null;
  }
};
