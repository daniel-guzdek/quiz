import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setQuizMode, setUserQuestions } from "../store/quizSlice";
import { getRandomQuestions } from "../data/questions";
import { QUESTIONS_PER_PLAYER } from "../config/quizConfig";
import type { QuizModeConfig } from "../config/quizConfig";
import type { QuizMode } from "../types";

type Props = Omit<QuizModeConfig, "id">;

const QuizModeCard = ({ variant, icon, description }: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.quiz.users);

  const handleClick = () => {
    dispatch(setQuizMode(variant as QuizMode));

    if (variant === "OMNIBUS") {
      users.forEach((user) => {
        dispatch(
          setUserQuestions({
            userId: user.id,
            questions: getRandomQuestions(QUESTIONS_PER_PLAYER),
          }),
        );
      });
    }
  };

  return (
    <Card onClick={handleClick} className="quiz-mode-card">
      <CardActionArea sx={{ height: "100%" }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <div className="quiz-mode-content">
              <Typography
                variant="h2"
                component="div"
                lineHeight={1}
                className="quiz-mode-icon"
              >
                {icon}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                textAlign="center"
                className="quiz-mode-variant"
              >
                {variant}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                className="quiz-mode-description"
              >
                {description}
              </Typography>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizModeCard;
