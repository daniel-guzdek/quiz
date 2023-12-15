import React, { useState } from "react";
import { Category } from "../../../ts/types/appTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/reducers";
import Box from "@mui/material/Box";
import { getIndicatedUserId } from "../../../utils/getIndicatedUserId";
import { QuestionsCatgProps } from "../models/QuestionsCatgProps";
import useResetCatg from "../hooks/useResetCatg";
import useRandomCatg from "../hooks/useRandomCatg";
import useAcceptCatg from "../hooks/useAcceptCatg";
import useCatgVisibility from "../hooks/useCatgVisibility";
import useRenderCatg from "../hooks/useRenderCatg";
import "../../../styles/app.less";

const QuestionsCatg: React.FC<QuestionsCatgProps> = (
  props: QuestionsCatgProps
) => {
  const [selectedCatg, setSelectedCatg] = useState<Category[] | []>([]);

  const { quizMode } = useSelector((state: RootState) => state.quiz);
  const actualUserId = useSelector(
    (state: RootState): number => state.quiz["actualUserId"]
  );

  const { handleResetCatg, disabledResetBtn } = useResetCatg({
    quizMode,
    users: props.players,
    userId: props.userId,
    getIndicatedUserId,
    setSelectedCatg,
    questionsShouldLoad: props.questionsShouldLoad,
    selectedCatg,
  });

  const { selectRandomCatg, disabledRandomCatgBtn } = useRandomCatg({
    quizMode,
    users: props.players,
    userId: props.userId,
    getIndicatedUserId,
    setSelectedCatg,
  });

  const { disabledAcceptBtn, handleAcceptCatg } = useAcceptCatg({
    quizMode,
    users: props.players,
    userId: props.userId,
    selectedCatg,
    getIndicatedUserId,
    setSelectedCatg,
    questionsShouldLoad: props.questionsShouldLoad,
  });

  const { hiddenCatgButtons } = useCatgVisibility({
    quizMode,
    users: props.players,
    userId: props.userId,
    getIndicatedUserId,
  });

  const { renderCatgView } = useRenderCatg({
    quizMode,
    actualUserId,
    users: props.players,
    userId: props.userId,
    userName: props.playerName,
    getIndicatedUserId,
    setSelectedCatg,
    questionsShouldLoad: props.questionsShouldLoad,
    selectedCatg,
    handleResetCatg,
    disabledResetBtn,
    selectRandomCatg,
    disabledRandomCatgBtn,
    handleAcceptCatg,
    disabledAcceptBtn,
    hiddenCatgButtons,
  });

  return (
    <Box>
      {quizMode !== "OMNIBUS" &&
        renderCatgView(
          actualUserId,
          props.userId,
          props.playerName,
          props.players,
          quizMode,
          props.questionsShouldLoad
        )}
    </Box>
  );
};

export default QuestionsCatg;
