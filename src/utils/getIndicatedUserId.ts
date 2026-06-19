import type { User } from "../types";

/**
 * Returns the ID of the user whose category the given userId must select
 * in ON THE EDGE mode. Players are paired: 1↔2, 3↔4, etc.
 * If the total number of players is odd, the last player picks for themselves.
 */
export const getIndicatedUserId = (userId: number, users: User[]): number => {
  const isOdd = users.length % 2 === 1;
  const isLast = userId === users.length;

  if (isOdd && isLast) return userId;

  return userId % 2 === 1 ? userId + 1 : userId - 1;
};
