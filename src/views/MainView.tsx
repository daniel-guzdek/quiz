import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import QuizModesPanel from "../components/QuizModesPanel";
import { RootState } from "../state/reducers";
import UserMode from "./UserMode";
import QuizModeSettingsView from "./QuizModeSettingsView";
import UserForm from "./UserForm";
import { questionsCanLoad } from "../utils/loadQuestionsChecker";
import ConfigSummary from "./ConfigSummary";
import "../styles/app.less";
import Btn from "../components/common/Buttons/Button";
import Title from "../components/common/Title/Title";
import QuestionRoundView from "./QuestionRoundView";

const MainView = () => {
  const dispatch = useDispatch();
  const { isPlayersModeSet, isFormValid, quizMode, users, isConfigReady } =
    useSelector((state: RootState) => state.quiz);

  const reduxStore = useSelector((state: RootState) => state.quiz);
  console.log(reduxStore);

  const handleReset = () => {
    dispatch({
      type: "reset-store",
    });
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className="centered centered-box">
          <Title text="Quiz" variant="h1" className="title" />
          <Btn
            name="Reset"
            variant="outlined"
            color="error"
            handler={handleReset}
          />
          <Box className={isFormValid ? "hidden" : "centered centered-column"}>
            {isPlayersModeSet ? <UserForm /> : <UserMode />}
          </Box>
          <Box>
            {isFormValid && <QuizModesPanel />}
            {quizMode && <QuizModeSettingsView />}
            {quizMode && questionsCanLoad(users) && !isConfigReady && (
              <ConfigSummary />
            )}
            {isConfigReady && <QuestionRoundView />}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MainView;
