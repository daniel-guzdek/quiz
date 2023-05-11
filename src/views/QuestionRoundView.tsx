import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "../components/Question";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/app_types";

const QuestionRoundView = () => {
  const [urls, setUrls] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  const dispatch = useDispatch();

  const quiz_mode = useSelector(
    (state: RootState): string => state.quiz["quiz_mode"]
  );
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  useEffect(() => {
    if (!isLoading) {
      const users = localUsers.map((localUser, index) => {
        localUser.quiz_data.allQuestions = allQuestions;
        return localUser;
      });
      setLocalUsers(users);
    }
    console.log(localUsers);
  }, [allQuestions, users, isLoading, localUsers]);

  useEffect(() => {
    const fetchQuestions = () => {
      console.log("Loading questions...");
      setIsLoading(true);
      if (quiz_mode === "OMNIBUS") {
        axios
          .get("https://opentdb.com/api.php?amount=15&type=multiple")
          .then((response) => {
            console.log(response.data.results);
            setAllQuestions(response.data.results);
          })
          .then(() => setIsLoading(false))
          .catch(() => setIsError(true));
      } else {
      }
    };

    fetchQuestions();
  }, [allQuestions, quiz_mode]);

  return (
    <div>
      <div>{quiz_mode}</div>
      <p>Question round view</p>
      <main>{isLoading ? "...loading" : <Question />}</main>
      <span>{isError ? "Sorry, we couldn't fetch any data" : null}</span>
    </div>
  );
};

export default QuestionRoundView;
