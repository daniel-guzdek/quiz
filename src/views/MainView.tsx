import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetStore } from "../store/quizSlice";
import { questionsCanLoad } from "../utils/questionsCanLoad";
import UserModeView from "./UserModeView";
import UserFormView from "./UserFormView";
import QuizModesPanel from "../components/QuizModesPanel";
import CategorySelectionView from "./CategorySelectionView";
import ConfigSummaryView from "./ConfigSummaryView";
import GameView from "./GameView";
import ResultsView from "./ResultsView";
import "../styles/app.less";

const MainView = () => {
  const dispatch = useAppDispatch();
  const {
    isPlayersModeSet,
    isFormValid,
    quizMode,
    users,
    isConfigReady,
    isGameOver,
  } = useAppSelector((s) => s.quiz);

  const canLoad = questionsCanLoad(users);

  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              width: "100%",
              height: "18vh",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            <Typography variant="h2">QUIZ</Typography>
            <div style={{ height: 40 }}>
              {(isPlayersModeSet || isFormValid) && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => dispatch(resetStore())}
                >
                  Reset
                </Button>
              )}
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
              width: "100%",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {isGameOver && <ResultsView />}
            {!isGameOver && (
              <>
                {!isFormValid && (
                  <>
                    {!isPlayersModeSet && <UserModeView />}
                    {isPlayersModeSet && <UserFormView />}
                  </>
                )}
                {isFormValid && !quizMode && <QuizModesPanel />}
                {quizMode && !canLoad && <CategorySelectionView />}
                {quizMode && canLoad && !isConfigReady && <ConfigSummaryView />}
                {isConfigReady && <GameView />}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MainView;
