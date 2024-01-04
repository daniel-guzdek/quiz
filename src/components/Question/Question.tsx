import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { shuffleAnswers } from "./utils/shuffleAnswers";

const Question = ({
  question,
  actualQuestion,
  setActualQuestion,
  actualUserQstIndex,
  setActualUserQstIndex,
  lastQuestionIndexBeforeNextUser,
  setLastQuestionIndexBeforeNextUser,
}: any) => {
  const wholeState = useSelector((state: RootState) => state.quiz);
  console.log(wholeState);

  const combinedAnswers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];

  const answers = shuffleAnswers(combinedAnswers);

  const setAnswer = (answer: string) => {
    // 1. check is Right?
    if (answer === question.correct_answer) {
      console.log("YES!");
    } else console.log("NO!");
    // after setting user's answer set colors (blue on user's answer and after 1 second green for right answer or red and green (blue --> red if user's answer is incorrect and green for correct))
    // 2. set actual user question index for +1 after 2 seconds
    setActualUserQstIndex(actualUserQstIndex + 1);
    // 3. set statistics
  };

  const renderOptions = answers?.map((answer: any, index: number) => {
    return <Button onClick={() => setAnswer(answer)}>{answer}</Button>;
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
