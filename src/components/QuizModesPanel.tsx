import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { quizConfig } from "../quizConfig/quizConfig";
import QuizMode from "./QuizMode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../styles/quizModes.css";

const QuizModesPanel = () => {
  const [isSinglePlayerMode, setIsSinglePlayerMode] = useState(false);
  const { players_mode, quiz_mode_is_set } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    players_mode === "single_player"
      ? setIsSinglePlayerMode(true)
      : setIsSinglePlayerMode(false);
  }, [isSinglePlayerMode, players_mode]);

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
      style={{
        display: `${quiz_mode_is_set ? "none" : "flex"}`,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom mb={4}>
        Select Quiz Mode
      </Typography>
      <Box className="quizModes__wrapper">{renderModes}</Box>
    </Box>
  );
};

export default QuizModesPanel;
