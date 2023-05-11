import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/app_types";
import "../styles/quizMode.css";

const QuizMode = (props: {
  variant: string;
  icon: any;
  description: string;
}) => {
  const mode_ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const wholeState = useSelector((state: RootState) => state.quiz);
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const modeHandler = () => {
    console.log(wholeState);
    const quizModeName = mode_ref.current?.childNodes[1].firstChild?.nodeValue;

    dispatch({
      type: "set-quiz-mode",
      payload: quizModeName,
    });

    dispatch({
      type: "set-is-quiz-mode-set",
      payload: true,
    });

    if (quizModeName === "OMNIBUS") {
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
    <div
      ref={mode_ref}
      onClick={() => modeHandler()}
      className="quizMode__wrapper"
    >
      <span>{props.icon}</span>
      <span>{props.variant}</span>
      <em>{props.description}</em>
    </div>
  );
};

export default QuizMode;
