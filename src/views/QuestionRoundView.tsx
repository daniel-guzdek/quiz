import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "../components/Question";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/appTypes";

const QuestionRoundView = () => {
  const [urls, setUrls] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  const dispatch = useDispatch();

  const quizMode = useSelector(
    (state: RootState): string => state.quiz["quizMode"]
  );
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  useEffect(() => {
    if (!isLoading) {
      const users = localUsers.map((localUser, index) => {
        localUser.quizData.questions = questions;
        return localUser;
      });
      setLocalUsers(users);
    }
    console.log(localUsers);
  }, [questions, users, isLoading, localUsers]);

  useEffect(() => {
    const fetchQuestions = () => {
      console.log("Loading questions...");
      setIsLoading(true);
      if (quizMode === "OMNIBUS") {
        axios
          .get("https://opentdb.com/api.php?amount=15&type=multiple")
          .then((response) => {
            console.log(response.data.results);
            setQuestions(response.data.results);
          })
          .then(() => setIsLoading(false))
          .catch(() => setIsError(true));
      } else {
      }
    };

    fetchQuestions();
  }, [questions, quizMode]);

  return (
    <div>
      <div>{quizMode}</div>
      <p>Question round view</p>
      <main>{isLoading ? "...loading" : <Question />}</main>
      <span>{isError ? "Sorry, we couldn't fetch any data" : null}</span>
    </div>
  );
};

export default QuestionRoundView;
