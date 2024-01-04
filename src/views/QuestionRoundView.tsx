import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { Box } from "@mui/material";
import Question from "../components/Question/Question";
import "../styles/app.less";

const QuestionRoundView = () => {
  const { users, actualUserId } = useSelector((state: RootState) => state.quiz);

  const [question, setQuestion] = useState({});
  const [usersQuizRoundData, setUsersQuizRoundData] = useState([]);
  const [isUserReady, setIsUserReady] = useState(false);
  const [actualUserQstIndex, setActualUserQstIndex] = useState(0);
  const [lastQuestionIndexBeforeNextUser, setLastQuestionIndexBeforeNextUser] =
    useState(0);

  const handleUserReady = () => {
    setIsUserReady(true);
  };

  // 1. renderuj tylko jedno pytanie dla aktualnego user'a
  const qst =
    users[actualUserId - 1]["quizData"]["questions"][actualUserQstIndex];
  console.log(qst);

  const renderQuestion = (
    <Question
      key={actualUserQstIndex}
      question={qst}
      setQuestion={setQuestion}
      actualUserId={actualUserId}
      actualUserQstIndex={actualUserQstIndex}
      setActualUserQstIndex={setActualUserQstIndex}
      lastQuestionIndexBeforeNextUser={lastQuestionIndexBeforeNextUser}
      setLastQuestionIndexBeforeNextUser={setLastQuestionIndexBeforeNextUser}
    />
  );

  return (
    <Box className="centered centered-column box">
      <p>Question round view</p>
      <div>
        <p>{users[actualUserId - 1]["name"]}</p>
        <button onClick={handleUserReady}>Ready</button>
      </div>
      <main>{isUserReady && renderQuestion}</main>
    </Box>
  );
};

export default QuestionRoundView;
