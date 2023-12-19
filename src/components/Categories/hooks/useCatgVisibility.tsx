import { mode } from "../../../constants/constants";
import useUsersData from "../../../hooks/useUsersData";
import { quizConfig } from "../../../quizConfig/quizConfig";
import { ICatgProps } from "../models/ICatgProps";

const useCatgVisibility = ({
  quizMode,
  users,
  userId,
  getIndicatedUserId,
}: ICatgProps) => {
  const {
    userCatgNum,
    indicatedUserCatgNum,
    indicatedUserCatgShouldLoad,
    isLastUserId,
    isOddUsersNum,
  } = useUsersData({ quizMode, users, userId, getIndicatedUserId });

  const hideCatgButtons = () => {
    if (quizMode === mode.ON_THE_EDGE) {
      if (
        indicatedUserCatgNum === quizConfig.maxCatgNum ||
        (isOddUsersNum && isLastUserId) ||
        indicatedUserCatgShouldLoad
      ) {
        return "hidden";
      } else return "catg-wrapper";
    } else {
      if (userCatgNum === quizConfig.maxCatgNum) {
        return "hidden";
      } else return "catg-wrapper";
    }
  };

  return {
    hideCatgButtons,
  };
};

export default useCatgVisibility;
