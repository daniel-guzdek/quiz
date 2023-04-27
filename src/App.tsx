import { useSelector, useDispatch } from "react-redux";
import QuizModesPanel from "./components/QuizModesPanel";
import { RootState } from "./state/reducers";
import PlayersMode from "./views/PlayersMode";
import SelectedQuizModeSettingsView from "./views/SelectedQuizModeSettingsView";
import UserForm from "./views/UserForm";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { players_mode_is_set, is_form_valid, quiz_mode_is_set } = useSelector(
    (state: RootState) => state.quiz
  );

  const wholeState = useSelector((state: RootState) => state.quiz);

  const handleReset = () => {
    dispatch({
      type: "reset-store",
    });
  };

  return (
    <div>
      <pre>{JSON.stringify(wholeState)}</pre>
      <h1>Quiz</h1>
      <button onClick={() => handleReset()}>Reset</button>
      <div style={{ display: `${is_form_valid ? "none" : "block"}` }}>
        {!players_mode_is_set ? <PlayersMode /> : <UserForm />}
      </div>
      {is_form_valid && <QuizModesPanel />}
      {quiz_mode_is_set && <SelectedQuizModeSettingsView />}
    </div>
  );
};

export default App;
