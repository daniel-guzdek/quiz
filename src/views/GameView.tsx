import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setActiveUserId, setGameOver } from "../store/quizSlice";
import Question from "../components/Question/Question";

type Phase = "ready" | "playing";

const QuestionRoundView = () => {
  const dispatch = useAppDispatch();
  const { users, activeUserId, playersMode } = useAppSelector((s) => s.quiz);
  const [phase, setPhase] = useState<Phase>(
    playersMode === "Single Player" ? "playing" : "ready",
  );
  const [questionIndex, setQuestionIndex] = useState(0);

  const activeUser = users.find((u) => u.id === activeUserId);

  if (!activeUser) return null;

  const questions = activeUser.quizData.questions;
  const totalQuestions = questions.length;
  const currentQuestion = questions[questionIndex];

  const handleReady = () => setPhase("playing");

  const handleNext = () => {
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const nextUserId = activeUserId + 1;
      if (nextUserId <= users.length) {
        dispatch(setActiveUserId(nextUserId));
        setQuestionIndex(0);
        setPhase("ready");
      } else {
        dispatch(setGameOver());
      }
    }
  };

  if (phase === "ready") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          pt: 6,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          {activeUser.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {totalQuestions} questions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleReady}
          sx={{ px: 6, py: 1.5 }}
        >
          Start
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        pt: 4,
        width: "100%",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {activeUser.name}
      </Typography>

      {currentQuestion && (
        <Question
          key={`${activeUserId}-${questionIndex}`}
          question={currentQuestion}
          questionNumber={questionIndex + 1}
          totalQuestions={totalQuestions}
          userId={activeUserId}
          onNext={handleNext}
        />
      )}
    </Box>
  );
};

export default QuestionRoundView;
