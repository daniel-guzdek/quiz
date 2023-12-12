import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/appTypes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Title from "./common/Title/Title";
import "../styles/app.less";

interface IQuizModeProps {
  variant: string;
  icon: any;
  description: string;
}

const QuizMode = ({ variant, icon, description }: IQuizModeProps) => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const modeHandler = () => {
    dispatch({
      type: "set-quiz-mode",
      payload: {
        quizMode: variant,
        isQuizModeSet: true,
      },
    });

    variant === "OMNIBUS" &&
      users.map((user) =>
        dispatch({
          type: "questions-should-load",
          payload: {
            userId: user.id,
            questionsShouldLoad: true,
          },
        })
      );
  };

  return (
    <Card onClick={() => modeHandler()} className="quizModeCard">
      <CardActionArea style={{ height: "100%" }}>
        <CardContent className="centered centered-column">
          <Typography variant="h2" component="div" mt={2} mb={0}>
            {icon}
          </Typography>
          <Title
            text={variant}
            gutterBottom
            variant="h6"
            component="div"
            mt={1}
          />
          <Title text={description} variant="body2" color="text.secondary" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizMode;
