import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { quizConfig } from "../quizConfig/quizConfig";
import QuizMode from "./QuizMode";
import Box from "@mui/material/Box";
import Title from "./common/Title/Title";

const QuizModesPanel = () => {
  const [isSinglePlayerMode, setIsSinglePlayerMode] = useState(false);
  const { playersMode, isQuizModeSet } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    playersMode === "Single Player"
      ? setIsSinglePlayerMode(true)
      : setIsSinglePlayerMode(false);
  }, [isSinglePlayerMode, playersMode]);

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
    <Box className={`${isQuizModeSet ? "hidden" : "centered centered-column"}`}>
      <Title text="Select Quiz Mode" variant="h6" mt={4} mb={2} />
      <Box className="centered centered-row" flexWrap="wrap">
        {renderModes}
      </Box>
    </Box>
  );
};

export default QuizModesPanel;
