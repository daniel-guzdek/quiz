import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { quizConfig } from "../quizConfig/quizConfig";
import QuizMode from "./QuizMode";
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
    <div style={{ display: `${quiz_mode_is_set ? "none" : "block"}` }}>
      <h1>Select Quiz Mode</h1>
      <div className="quizModes__wrapper">{renderModes}</div>
    </div>
  );
};

export default QuizModesPanel;
