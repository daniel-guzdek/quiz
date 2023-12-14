import { mode } from "../../../constants/constants";
import { quizConfig } from "../../../quizConfig/quizConfig";
import { ICategoriesProps } from "../models/ICategoriesProps";

const useCategoriesVisibility = ({
  quizMode,
  users,
  userId,
  setCustomUserId,
}: ICategoriesProps) => {
  const hiddenCategoriesButtons = () => {
    if (quizMode === mode.ON_THE_EDGE) {
      if (
        users[setCustomUserId(userId, users) - 1].quizData.selectedCategories
          .length === quizConfig.maxNumCategories ||
        (users.length % 2 === 1 && userId === users.length) ||
        users[setCustomUserId(userId, users) - 1].quizData.questionsShouldLoad
      ) {
        return "hidden";
      } else return "categoriesWrapper";
    } else {
      if (
        users[userId - 1].quizData.selectedCategories.length ===
        quizConfig.maxNumCategories
      ) {
        return "hidden";
      } else return "categoriesWrapper";
    }
  };

  return {
    hiddenCategoriesButtons,
  };
};

export default useCategoriesVisibility;
