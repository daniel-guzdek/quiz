import { useEffect, useMemo, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch } from "../../store/hooks";
import { answerQuestion } from "../../store/quizSlice";
import { shuffleArray } from "../../utils/shuffleArray";
import type { Question as QuestionType } from "../../types";

interface Props {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  userId: number;
  onNext: (isCorrect: boolean) => void;
}

type AnswerState = "idle" | "correct" | "incorrect" | "timeout";

const TIMER_MS = 5000;

const Question = ({
  question,
  questionNumber,
  totalQuestions,
  userId,
  onNext,
}: Props) => {
  const dispatch = useAppDispatch();
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_MS);

  // Keep a stable ref so effects don't need onNext in their dep array
  const onNextRef = useRef(onNext);
  useEffect(() => {
    onNextRef.current = onNext;
  });

  // Shuffle once per question — memoised so a re-render caused by selecting an
  // answer does not reorder the buttons mid-interaction.
  const answers = useMemo(
    () =>
      shuffleArray([question.correct_answer, ...question.incorrect_answers]),
    [question],
  );

  // Reset all state when a new question arrives
  useEffect(() => {
    setTimeLeft(TIMER_MS);
    setAnswerState("idle");
    setSelectedAnswer(null);
  }, [question]);

  // Countdown timer — only active while the player hasn't answered yet
  useEffect(() => {
    if (answerState !== "idle") return;

    const timeoutId = setTimeout(() => {
      dispatch(answerQuestion({ userId, isCorrect: false }));
      setAnswerState("timeout");
      setTimeout(() => onNextRef.current(false), 1200);
    }, TIMER_MS);

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 100));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [answerState, question, dispatch, userId]);

  const handleAnswer = (answer: string) => {
    if (answerState !== "idle") return;

    const isCorrect = answer === question.correct_answer;
    setSelectedAnswer(answer);
    setAnswerState(isCorrect ? "correct" : "incorrect");
    dispatch(answerQuestion({ userId, isCorrect }));
    setTimeout(() => onNextRef.current(isCorrect), 1200);
  };

  const getButtonVariant = (answer: string): "contained" | "outlined" => {
    if (answerState === "idle") return "outlined";
    if (answer === question.correct_answer) return "contained";
    if (answer === selectedAnswer) return "contained";
    return "outlined";
  };

  const getAnswerSx = (answer: string) => {
    if (answerState === "idle") return {};
    if (answer === question.correct_answer)
      return {
        "&.Mui-disabled": {
          bgcolor: "#2e7d32",
          color: "white",
          borderColor: "#2e7d32",
        },
      };
    if (answer === selectedAnswer)
      return {
        "&.Mui-disabled": {
          bgcolor: "#c62828",
          color: "white",
          borderColor: "#c62828",
        },
      };
    return {};
  };

  const progress = (questionNumber / totalQuestions) * 100;
  const timerProgress = (timeLeft / TIMER_MS) * 100;
  const timerColor =
    timerProgress > 50 ? "#2e7d32" : timerProgress > 25 ? "#f57c00" : "#c62828";

  return (
    <Box sx={{ width: "100%", maxWidth: 600 }}>
      <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.secondary">
          Question {questionNumber} of {totalQuestions}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {question.difficulty} {"\u00b7"} {question.category}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 1, borderRadius: 1 }}
      />

      <LinearProgress
        variant="determinate"
        value={timerProgress}
        sx={{
          mb: 2,
          borderRadius: 1,
          "& .MuiLinearProgress-bar": {
            bgcolor: timerColor,
            transition:
              "background-color 0.4s, transform 0.15s linear !important",
          },
        }}
      />

      <Card elevation={2}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3 }}
          >
            {question.question}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
            }}
          >
            {answers.map((answer, index) => (
              <Button
                key={index}
                variant={getButtonVariant(answer)}
                disabled={answerState !== "idle"}
                onClick={() => handleAnswer(answer)}
                sx={{
                  textTransform: "none",
                  fontSize: "0.9rem",
                  py: 1.5,
                  ...getAnswerSx(answer),
                }}
              >
                {answer}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Question;
