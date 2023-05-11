import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";

const Question = () => {
  const wholeState = useSelector((state: RootState) => state.quiz);
  console.log(wholeState);

  return <div>Question</div>;
};

export default Question;
