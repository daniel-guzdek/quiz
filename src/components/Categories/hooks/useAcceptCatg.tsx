import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../../ts/types/appTypes";
import { ICatgProps } from "../models/ICatgProps";
import { mode } from "../../../constants/constants";
import useUsersData from "../../../hooks/useUsersData";

interface IAcceptCatgProps extends ICatgProps {
  setSelectedCatg: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  selectedCatg: Category[];
  questionsShouldLoad?: boolean;
}

const useAcceptCatg = ({
  quizMode,
  users,
  userId,
  selectedCatg,
  getIndicatedUserId,
  questionsShouldLoad,
}: IAcceptCatgProps) => {
  const dispatch = useDispatch();

  const {
    usersNum,
    indicatedUserId,
    indicatedUserCatgNum,
    indicatedUserCatgShouldLoad,
  } = useUsersData({ quizMode, users, userId, getIndicatedUserId });

  const questionsShouldLoadPayload = useMemo(
    () => ({
      userId: quizMode === mode.ON_THE_EDGE ? indicatedUserId : userId,
      questionsShouldLoad: true,
    }),
    [userId, quizMode, indicatedUserId]
  );

  const getPlayerQuizDataPayload = useCallback(
    (userId: number, questionsShouldLoad: boolean) => ({
      userId,
      selectedCatg,
      questionsShouldLoad,
    }),
    [selectedCatg]
  );

  const handleAcceptCatg = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      dispatch({
        type: "set-actual-user-id",
        payload: userId + 1 > usersNum ? 1 : userId + 1,
      });
      dispatch({
        type: "questions-should-load",
        payload: questionsShouldLoadPayload,
      });
    } else {
      dispatch({
        type: "set-player-quiz-data",
        payload: getPlayerQuizDataPayload(userId, true),
      });
      dispatch({
        type: "questions-should-load",
        payload: questionsShouldLoadPayload,
      });
    }
  }, [
    dispatch,
    userId,
    usersNum,
    quizMode,
    getPlayerQuizDataPayload,
    questionsShouldLoadPayload,
  ]);

  const disabledAcceptBtn = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      return !indicatedUserCatgNum || indicatedUserCatgShouldLoad;
    } else {
      return questionsShouldLoad || !selectedCatg.length;
    }
  }, [
    questionsShouldLoad,
    quizMode,
    selectedCatg.length,
    indicatedUserCatgNum,
    indicatedUserCatgShouldLoad,
  ]);

  return {
    disabledAcceptBtn,
    handleAcceptCatg,
  };
};

export default useAcceptCatg;
