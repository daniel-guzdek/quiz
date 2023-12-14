import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../../ts/types/appTypes";
import { ICategoriesProps } from "../models/ICategoriesProps";
import { mode } from "../../../constants/constants";

interface IAcceptCategoriesProps extends ICategoriesProps {
  setSelectedCategories: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  selectedCategories: Category[];
  questionsShouldLoad?: boolean;
}

const useAcceptCategories = ({
  quizMode,
  users,
  userId,
  selectedCategories,
  setCustomUserId,
  questionsShouldLoad,
}: IAcceptCategoriesProps) => {
  const dispatch = useDispatch();

  const questionsShouldLoadPayload = useMemo(
    () => ({
      userId:
        quizMode === mode.ON_THE_EDGE ? setCustomUserId(userId, users) : userId,
      questionsShouldLoad: true,
    }),
    [userId, users, quizMode, setCustomUserId]
  );

  const getPlayerQuizDataPayload = useCallback(
    (userId: number, questionsShouldLoad: boolean) => ({
      userId,
      selectedCategories: selectedCategories,
      questionsShouldLoad,
    }),
    [selectedCategories]
  );

  const handleAcceptCategories = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      dispatch({
        type: "set-actual-user-id",
        payload: userId + 1 > users.length ? 1 : userId + 1,
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
    users,
    quizMode,
    getPlayerQuizDataPayload,
    questionsShouldLoadPayload,
  ]);

  const disabledAcceptBtn = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      return (
        users[setCustomUserId(userId, users) - 1].quizData.selectedCategories
          .length === 0 ||
        users[setCustomUserId(userId, users) - 1].quizData.questionsShouldLoad
      );
    } else {
      return questionsShouldLoad || !selectedCategories.length;
    }
  }, [
    userId,
    users,
    questionsShouldLoad,
    quizMode,
    selectedCategories.length,
    setCustomUserId,
  ]);

  return {
    disabledAcceptBtn,
    handleAcceptCategories,
  };
};

export default useAcceptCategories;
