import { useSelector, useDispatch } from "react-redux";
import QuizModesPanel from "./components/QuizModesPanel";
import { RootState } from "./state/reducers";
import PlayersMode from "./views/PlayersMode";
import QuestionRoundView from "./views/QuestionRoundView";
import SelectedQuizModeSettingsView from "./views/SelectedQuizModeSettingsView";
import UserForm from "./views/UserForm";
import { loadQuestionsChecker } from "./utils/loadQuestionsChecker";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    players_mode_is_set,
    is_form_valid,
    quiz_mode_is_set,
    quiz_mode,
    users,
  } = useSelector((state: RootState) => state.quiz);

  const wholeState = useSelector((state: RootState) => state.quiz);
  console.log(wholeState);

  const handleReset = () => {
    dispatch({
      type: "reset-store",
    });
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(wholeState)}</pre> */}
      <h1>Quiz</h1>
      <button onClick={() => handleReset()}>Reset</button>
      <div style={{ display: `${is_form_valid ? "none" : "block"}` }}>
        {!players_mode_is_set ? <PlayersMode /> : <UserForm />}
      </div>
      {is_form_valid && <QuizModesPanel />}
      {quiz_mode_is_set &&
        (quiz_mode === "MY THING" ||
          quiz_mode === "MY THING VS. MY THING" ||
          quiz_mode === "MY THING VS. MY THING" ||
          quiz_mode === "ON THE EDGE") && <SelectedQuizModeSettingsView />}
      {quiz_mode_is_set && loadQuestionsChecker(users) && <QuestionRoundView />}
    </div>
  );
};

export default App;
