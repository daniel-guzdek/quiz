import Box from "@mui/material/Box";
import { useAppSelector } from "../store/hooks";
import QuizModeCard from "./QuizModeCard";
import { QUIZ_MODES } from "../config/quizConfig";

const QuizModesPanel = () => {
  const { isQuizModeSet, playersMode } = useAppSelector((s) => s.quiz);

  if (isQuizModeSet) return null;

  const isSinglePlayer = playersMode === "Single Player";
  const availableModes = QUIZ_MODES.filter((m) =>
    isSinglePlayer ? m.isSinglePlayerMode : m.isMultiPlayerMode,
  );

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} pt={4}>
      {availableModes.map((mode) => (
        <QuizModeCard
          key={mode.id}
          variant={mode.variant}
          icon={mode.icon}
          description={mode.description}
          isSinglePlayerMode={mode.isSinglePlayerMode}
          isMultiPlayerMode={mode.isMultiPlayerMode}
        />
      ))}
    </Box>
  );
};

export default QuizModesPanel;
