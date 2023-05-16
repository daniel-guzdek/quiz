import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/app_types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../styles/quizMode.css";

const QuizMode = (props: {
  variant: string;
  icon: any;
  description: string;
}) => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const modeHandler = () => {
    dispatch({
      type: "set-quiz-mode",
      payload: props.variant,
    });

    dispatch({
      type: "set-is-quiz-mode-set",
      payload: true,
    });

    if (props.variant === "OMNIBUS") {
      users.map((user, index) => {
        return dispatch({
          type: "questions-should-load",
          payload: {
            userId: index + 1,
            questionsShouldLoad: true,
          },
        });
      });
    }
  };

  return (
    <Card onClick={() => modeHandler()} sx={{ width: 300, margin: "10px" }}>
      <CardActionArea>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h2" component="div" mt={2} mb={0}>
            {props.icon}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" mt={1}>
            {props.variant}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizMode;
