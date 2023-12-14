import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../../ts/types/appTypes";
import { ICategoriesProps } from "../models/ICategoriesProps";
import { mode } from "../../../constants/constants";

interface IResetCategoriesProps extends ICategoriesProps {
  setSelectedCategories: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  questionsShouldLoad: boolean;
  selectedCategories: Category[];
}

const useResetCategories = ({
  quizMode,
  users,
  userId,
  setCustomUserId,
  setSelectedCategories,
  questionsShouldLoad,
  selectedCategories,
}: IResetCategoriesProps) => {
  const dispatch = useDispatch();

  const resetCatPayload = useMemo(
    () => ({
      userId:
        quizMode === mode.ON_THE_EDGE && users.length > 1
          ? setCustomUserId(userId, users)
          : userId,
      users: users,
      questionsShouldLoad: false,
    }),
    [quizMode, userId, users, setCustomUserId]
  );

  const handleResetCategories = () => {
    dispatch({
      type: "reset-user-categories",
      payload: resetCatPayload,
    });
    setSelectedCategories([]);
  };

  const disabledResetBtn = useCallback(() => {
    if (quizMode === mode.ON_THE_EDGE) {
      return (
        users[setCustomUserId(userId, users) - 1].quizData.selectedCategories
          .length === 0 ||
        users[setCustomUserId(userId, users) - 1].quizData
          .questionsShouldLoad ||
        (users.length % 2 === 1 && userId === users.length)
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
    resetCatPayload,
    handleResetCategories,
    disabledResetBtn,
  };
};

export default useResetCategories;
