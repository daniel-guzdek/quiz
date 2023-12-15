import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../../ts/types/appTypes";
import { ICatgProps } from "../models/ICatgProps";
import { mode } from "../../../constants/constants";
import useUsersData from "../../../hooks/useUsersData";

interface IResetCatgProps extends ICatgProps {
  setSelectedCatg: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  questionsShouldLoad: boolean;
  selectedCatg: Category[];
}

const useResetCatg = ({
  quizMode,
  users,
  userId,
  getIndicatedUserId,
  setSelectedCatg,
  questionsShouldLoad,
  selectedCatg,
}: IResetCatgProps) => {
  const dispatch = useDispatch();

  const {
    multiPlayerMode,
    indicatedUserId,
    indicatedUserCatgNum,
    indicatedUserCatgShouldLoad,
    isLastUserId,
    isOddUsersNum,
  } = useUsersData({ quizMode, users, userId, getIndicatedUserId });

  const resetCatPayload = useMemo(
    () => ({
      userId:
        quizMode === mode.ON_THE_EDGE && multiPlayerMode
          ? indicatedUserId
          : userId,
      users,
      questionsShouldLoad: false,
    }),
    [quizMode, userId, users, indicatedUserId, multiPlayerMode]
  );

  const handleResetCatg = () => {
    dispatch({
      type: "reset-user-catg",
      payload: resetCatPayload,
    });
    setSelectedCatg([]);
  };

  const disabledResetBtn = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      return (
        !indicatedUserCatgNum ||
        indicatedUserCatgShouldLoad ||
        (isOddUsersNum && isLastUserId)
      );
    } else {
      return questionsShouldLoad || !selectedCatg.length;
    }
  }, [
    questionsShouldLoad,
    quizMode,
    selectedCatg.length,
    indicatedUserCatgNum,
    indicatedUserCatgShouldLoad,
    isLastUserId,
    isOddUsersNum,
  ]);

  return {
    resetCatPayload,
    handleResetCatg,
    disabledResetBtn,
  };
};

export default useResetCatg;
