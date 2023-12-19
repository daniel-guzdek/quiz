import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { quizConfig } from "../quizConfig/quizConfig";
import QuizMode from "./QuizMode";
import Box from "@mui/material/Box";

const QuizModesPanel = () => {
  const [isSinglePlayerMode, setIsSinglePlayerMode] = useState(false);
  const { usersMode, isQuizModeSet } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    usersMode === "Single Player"
      ? setIsSinglePlayerMode(true)
      : setIsSinglePlayerMode(false);
  }, [isSinglePlayerMode, usersMode]);

  const renderModes = quizConfig.quizModes
    .filter((quizMode) =>
      isSinglePlayerMode
        ? quizMode.isSinglePlayerMode
        : quizMode.isMultiPlayerMode
    )
    .map((mode) => {
      return (
        <QuizMode
          key={mode.id}
          variant={mode.variant}
          icon={mode.icon}
          description={mode.description}
        />
      );
    });

  return (
    <Box
      className={`${isQuizModeSet ? "hidden" : "centered centered-column box"}`}
    >
      <Box className="centered centered-row" flexWrap="wrap">
        {renderModes}
      </Box>
    </Box>
  );
};

export default QuizModesPanel;
