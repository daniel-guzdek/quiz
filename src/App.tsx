import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import QuizModesPanel from "./components/QuizModesPanel";
import { RootState } from "./state/reducers";
import PlayersMode from "./views/PlayersMode";
import QuestionRoundView from "./views/QuestionRoundView";
import SelectedQuizModeSettingsView from "./views/SelectedQuizModeSettingsView";
import UserForm from "./views/UserForm";
import { loadQuestionsChecker } from "./utils/loadQuestionsChecker";
import Button from "@mui/material/Button";
import "./styles/app.css";
import ConfigSummary from "./views/ConfigSummary";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    players_mode_is_set,
    is_form_valid,
    quiz_mode_is_set,
    quiz_mode,
    users,
  } = useSelector((state: RootState) => state.quiz);

  const reduxStore = useSelector((state: RootState) => state.quiz);
  console.log(reduxStore);

  const handleReset = () => {
    dispatch({
      type: "reset-store",
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {/* <code>{JSON.stringify(reduxStore)}</code> */}
          <Typography variant="h1" gutterBottom>
            Quiz
          </Typography>
          <Button
            onClick={() => handleReset()}
            variant="outlined"
            color="error"
          >
            Reset
          </Button>
          <div style={{ position: "relative", width: "100%" }}>
            <div
              style={{
                display: `${is_form_valid ? "none" : "flex"}`,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!players_mode_is_set ? <PlayersMode /> : <UserForm />}
            </div>
            <Box>
              {is_form_valid && <QuizModesPanel />}
              {quiz_mode_is_set &&
                (quiz_mode === "MY THING" ||
                  quiz_mode === "MY THING VS. MY THING" ||
                  quiz_mode === "MY THING VS. MY THING" ||
                  quiz_mode === "ON THE EDGE") && (
                  <SelectedQuizModeSettingsView />
                )}
              {quiz_mode_is_set && loadQuestionsChecker(users) && (
                <ConfigSummary />
              )}
            </Box>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default App;
