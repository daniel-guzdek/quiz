import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../../ts/types/appTypes";
import { quizConfig } from "../../../quizConfig/quizConfig";
import { ICategoriesProps } from "../models/ICategoriesProps";
import { mode } from "../../../constants/constants";

interface IRandomCategoriesProps extends ICategoriesProps {
  setSelectedCategories: React.Dispatch<React.SetStateAction<[] | Category[]>>;
}

const useRandomCategories = ({
  quizMode,
  users,
  userId,
  setCustomUserId,
}: IRandomCategoriesProps) => {
  const dispatch = useDispatch();

  const selectRandomCategories = useCallback(
    (categoriesNumber: number) => {
      return (event: React.MouseEvent) => {
        event.preventDefault();

        const categories = quizConfig.categories;

        let arr = [];
        const min = categories[0].id;
        const max = categories[categories.length - 1].id;

        while (arr.length < categoriesNumber) {
          const rand = Math.floor(Math.random() * (max - min + 1) + min);
          if (arr.indexOf(rand) === -1) arr.push(rand);
        }

        const selectedCategories = arr.map((el) => {
          const category = categories.find((category) => category.id === el);
          return {
            id: el,
            name: category?.name,
            color: category?.color,
            questions: [],
          };
        });

        dispatch({
          type: "set-player-quiz-data",
          payload: {
            userId: setCustomUserId(userId, users),
            selectedCategories: selectedCategories,
            questionsShouldLoad: false,
          },
        });
      };
    },
    [dispatch, userId, users, setCustomUserId]
  );

  const disabledRandomCategoriesBtn = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      return (
        users[setCustomUserId(userId, users) - 1].quizData
          .questionsShouldLoad ||
        (users.length % 2 === 1 &&
          userId === users.length &&
          users[users.length - 1].quizData.selectedCategories.length ===
            quizConfig.maxNumCategories)
      );
    }
  }, [userId, users, quizMode, setCustomUserId]);

  return {
    selectRandomCategories,
    disabledRandomCategoriesBtn,
  };
};

export default useRandomCategories;
