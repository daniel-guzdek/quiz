import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainView from "./views/MainView";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <MainView />
  </ThemeProvider>
);

export default App;
