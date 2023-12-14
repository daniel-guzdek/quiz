import React, { useState } from "react";
import { Category } from "../../../ts/types/appTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/reducers";
import Box from "@mui/material/Box";
import { setCustomUserId } from "../../../utils/setCustomUserId";
import { QuestionsCategoriesProps } from "../models/QuestionsCategoriesProps";
import useResetCategories from "../hooks/useResetCategories";
import useRandomCategories from "../hooks/useRandomCategories";
import useAcceptCategories from "../hooks/useAcceptCategories";
import useCategoriesVisibility from "../hooks/useCategoriesVisibility";
import useRenderCategories from "../hooks/useRenderCategories";
import "../../../styles/app.less";

const QuestionsCategories: React.FC<QuestionsCategoriesProps> = (
  props: QuestionsCategoriesProps
) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[] | []>(
    []
  );

  const { quizMode } = useSelector((state: RootState) => state.quiz);
  const actualUserId = useSelector(
    (state: RootState): number => state.quiz["actualUserId"]
  );

  const { handleResetCategories, disabledResetBtn } = useResetCategories({
    quizMode,
    users: props.players,
    userId: props.playerId,
    setCustomUserId,
    setSelectedCategories,
    questionsShouldLoad: props.questionsShouldLoad,
    selectedCategories,
  });

  const { selectRandomCategories, disabledRandomCategoriesBtn } =
    useRandomCategories({
      quizMode,
      users: props.players,
      userId: props.playerId,
      setCustomUserId,
      setSelectedCategories,
    });

  const { disabledAcceptBtn, handleAcceptCategories } = useAcceptCategories({
    quizMode,
    users: props.players,
    userId: props.playerId,
    selectedCategories,
    setCustomUserId,
    setSelectedCategories,
    questionsShouldLoad: props.questionsShouldLoad,
  });

  const { hiddenCategoriesButtons } = useCategoriesVisibility({
    quizMode,
    users: props.players,
    userId: props.playerId,
    setCustomUserId,
  });

  const { renderCategoriesView } = useRenderCategories({
    quizMode,
    actualUserId,
    users: props.players,
    userId: props.playerId,
    userName: props.playerName,
    setCustomUserId,
    setSelectedCategories,
    questionsShouldLoad: props.questionsShouldLoad,
    selectedCategories,
    handleResetCategories,
    disabledResetBtn,
    selectRandomCategories,
    disabledRandomCategoriesBtn,
    handleAcceptCategories,
    disabledAcceptBtn,
    hiddenCategoriesButtons,
  });

  return (
    <Box>
      {quizMode !== "OMNIBUS" &&
        renderCategoriesView(
          actualUserId,
          props.playerId,
          props.playerName,
          props.players,
          quizMode,
          props.questionsShouldLoad
        )}
    </Box>
  );
};

export default QuestionsCategories;
