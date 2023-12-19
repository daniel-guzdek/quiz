import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/appTypes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Title from "./common/Title/Title";
import { useFetch } from "../hooks/useFetch";
import { ActionType } from "../state/action-types";
import "../styles/app.less";

interface IQuizModeProps {
  variant: string;
  icon: any;
  description: string;
}

const QuizMode = ({ variant, icon, description }: IQuizModeProps) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const { questions, loadData } = useFetch(users, 0, variant);

  const modeHandler = () => {
    dispatch({
      type: "set-quiz-mode",
      payload: {
        quizMode: variant,
        isQuizModeSet: true,
      },
    });

    variant === "OMNIBUS" &&
      users.length &&
      users.forEach((user: User) => {
        dispatch({
          type: "questions-should-load",
          payload: {
            userId: user.id,
            questionsShouldLoad: true,
          },
        });
      });
    loadData();
  };

  useEffect(() => {
    variant === "OMNIBUS" &&
      questions.length &&
      users.forEach((user: User) =>
        dispatch({
          type: ActionType.SET_QUESTIONS_FOR_EACH_USER,
          payload: {
            userId: user.id,
            questions: questions.flat(),
          },
        })
      );
  }, [questions, dispatch]);

  return (
    <Card onClick={() => modeHandler()} className="quiz-mode-card">
      <CardActionArea style={{ height: "100%" }}>
        <CardContent className="centered centered-column">
          <Typography variant="h2" component="div" mt={2} mb={0}>
            {icon}
          </Typography>
          <Title
            text={variant}
            variant="h6"
            component="div"
            className="mode-card-title"
          />
          <Title
            text={description}
            variant="body2"
            color="text.secondary"
            className="mode-card-subtitle"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizMode;
