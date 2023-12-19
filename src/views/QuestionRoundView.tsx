import { useSelector } from "react-redux";
import Question from "../components/Question";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/appTypes";

const QuestionRoundView = () => {
  const quizMode = useSelector(
    (state: RootState): string => state.quiz["quizMode"]
  );
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  return (
    <div>
      <div>{quizMode}</div>
      <p>Question round view</p>
      <main>
        <Question />
      </main>
    </div>
  );
};

export default QuestionRoundView;
