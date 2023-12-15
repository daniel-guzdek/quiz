import { User } from "../ts/types/appTypes";

export const getIndicatedUserId = (userId: number, users: User[]): number => {
  const isOddUsersNum = users.length % 2 === 1;
  const isLastUserId = userId === users.length;

  switch (true) {
    case isOddUsersNum && isLastUserId:
      return userId;
    case userId === 1:
      return users[userId].id;
    case userId === 2:
      return users[userId - 2].id;
    case userId === 3:
      return users[userId].id;
    case userId === 4:
      return users[userId - 2].id;
    case userId === 5:
      return userId;
    default:
      return userId;
  }
};
