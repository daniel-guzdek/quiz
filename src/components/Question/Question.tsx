import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../state/reducers";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { shuffleAnswers } from "./utils/shuffleAnswers";
import { User } from "../../ts/types/appTypes";
import { RootState } from "../../state/reducers";
import { quizConfig } from "../../quizConfig/quizConfig";

const Question = ({
  actualUserId,
  question,
  actualQuestion,
  setActualQuestion,
  actualUserQstIndex,
  setActualUserQstIndex,
  lastQuestionIndexBeforeNextUser,
  setLastQuestionIndexBeforeNextUser,
}: any) => {
  // const wholeState = useSelector((state: RootState) => state.quiz);
  // console.log(wholeState);

  const user = useSelector(
    (state: RootState): User => state.quiz["users"][actualUserId - 1]
  );
  console.log(user);

  const { quizMode, users } = useSelector((state: RootState) => state.quiz);

  const dispatch = useDispatch();

  const combinedAnswers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];

  const answers = shuffleAnswers(combinedAnswers);

  const setAnswer = (answer: string) => {
    // 1. check is Right?
    if (answer === question.correct_answer) {
      console.log("YES!");
      dispatch({
        type: "add-correct-answer-score",
        payload: {
          // userId: selectedUserId && indicatedUserId,
          userId: actualUserId,
          amount: user.correctAnswers + 1,
        },
      });
    } else {
      console.log("NO!");
      dispatch({
        type: "add-incorrect-answer-score",
        payload: {
          // userId: selectedUserId && indicatedUserId,
          userId: actualUserId,
          amount: user.incorrectAnswers + 1,
        },
      });
    }
    // after setting user's answer set colors (blue on user's answer and after 1 second green for right answer or red and green (blue --> red if user's answer is incorrect and green for correct))
    // 2. set actual user question index for +1 after 2 seconds
    console.log(user.quizData.questions.length);
    console.log(actualUserQstIndex + 1);

    // SINGLE PLAYER
    user.quizData.questions.length > actualUserQstIndex + 1 &&
      setActualUserQstIndex(actualUserQstIndex + 1);

    // MULTI PLAYER
    if (
      quizMode === "MULTI PLAYER" &&
      actualUserQstIndex + 1 ===
        user.quizData.questions.length / quizConfig.questions.amount
    ) {
      // setActualUserId(actualUserId);
      dispatch({
        type: "set-actual-user-id",
        payload: actualUserId + 1,
      });
    }
    // 3. check is game over & check who is winner (??? or just statistics for users)
  };

  const renderOptions = answers?.map((answer: any, index: number) => {
    return (
      <Button key={index} onClick={() => setAnswer(answer)}>
        {answer}
      </Button>
    );
  });

  console.log(answers);

  return (
    <>
      <div>Question {actualUserQstIndex + 1}</div>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <p>{question.question}</p>
        </CardContent>
        {renderOptions}
      </Card>
    </>
  );
};

export default Question;
