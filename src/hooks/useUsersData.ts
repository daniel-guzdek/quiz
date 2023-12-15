import { User } from "../ts/types/appTypes";

interface IUsersDataProps {
  quizMode: string;
  users: User[];
  userId: number;
  getIndicatedUserId: (userId: number, users: User[]) => number;
  //   setSelectedCatg: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  //   questionsShouldLoad: boolean;
  //   selectedCatg: Category[];
}

const useUsersData = ({
  // quizMode,
  users,
  userId,
  getIndicatedUserId,
}: IUsersDataProps) => {
  const usersNum = users.length;
  const multiPlayerMode = users.length > 1;
  const userIndex = userId - 1;
  const user = users[userIndex];
  const userCatg = users[userIndex].quizData.selectedCatg;
  const userCatgNum = users[userIndex].quizData.selectedCatg.length;
  const isOddUsersNum: boolean = users.length % 2 === 1;
  const lastUserId = users.length - 1;
  const isLastUserId = userId === users.length;
  const hasLastUserCatg = users[lastUserId].quizData.selectedCatg.length;

  const indicatedUserId = getIndicatedUserId(userId, users);
  const indicatedUserIndex = getIndicatedUserId(userId, users) - 1;
  const indicatedUser = users[indicatedUserIndex];
  const indicatedUserCatg = users[indicatedUserIndex].quizData.selectedCatg;
  const indicatedUserCatgNum =
    users[indicatedUserIndex].quizData.selectedCatg.length;
  const indicatedUserCatgShouldLoad =
    users[indicatedUserIndex].quizData.questionsShouldLoad;

  return {
    multiPlayerMode,
    usersNum,
    userIndex,
    indicatedUserId,
    indicatedUserIndex,
    user,
    indicatedUser,
    userCatg,
    userCatgNum,
    indicatedUserCatg,
    indicatedUserCatgNum,
    indicatedUserCatgShouldLoad,
    lastUserId,
    isLastUserId,
    hasLastUserCatg,
    isOddUsersNum,
  };
};

export default useUsersData;
