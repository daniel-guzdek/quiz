import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../../ts/types/appTypes";
import { quizConfig } from "../../../quizConfig/quizConfig";
import { ICatgProps } from "../models/ICatgProps";
import { mode } from "../../../constants/constants";
import useUsersData from "../../../hooks/useUsersData";

interface IRandomCatgProps extends ICatgProps {
  setSelectedCatg: React.Dispatch<React.SetStateAction<[] | Category[]>>;
}

const useRandomCatg = ({
  quizMode,
  users,
  userId,
  getIndicatedUserId,
}: IRandomCatgProps) => {
  const dispatch = useDispatch();

  const {
    indicatedUserId,
    indicatedUserCatgShouldLoad,
    isLastUserId,
    hasLastUserCatg,
    isOddUsersNum,
  } = useUsersData({ quizMode, users, userId, getIndicatedUserId });

  const selectRandomCatg = useCallback(
    (catgNumber: number) => {
      return (event: React.MouseEvent) => {
        event.preventDefault();

        const catg = quizConfig.catg;

        let arr = [];
        const min = catg[0].id;
        const max = catg[catg.length - 1].id;

        while (arr.length < catgNumber) {
          const rand = Math.floor(Math.random() * (max - min + 1) + min);
          if (arr.indexOf(rand) === -1) arr.push(rand);
        }

        const selectedCatg = arr.map((el) => {
          const category = catg.find((category) => category.id === el);
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
            userId: indicatedUserId,
            selectedCatg: selectedCatg,
            questionsShouldLoad: false,
          },
        });
      };
    },
    [dispatch, indicatedUserId]
  );

  const disabledRandomCatgBtn = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      return (
        indicatedUserCatgShouldLoad ||
        (isOddUsersNum &&
          isLastUserId &&
          hasLastUserCatg === quizConfig.maxCatgNum)
      );
    }
  }, [
    quizMode,
    hasLastUserCatg,
    indicatedUserCatgShouldLoad,
    isLastUserId,
    isOddUsersNum,
  ]);

  return {
    selectRandomCatg,
    disabledRandomCatgBtn,
  };
};

export default useRandomCatg;
