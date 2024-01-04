import { useDispatch, useSelector } from "react-redux";
import { User } from "../ts/types/appTypes";
import { RootState } from "../state/reducers";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Title from "../components/common/Title/Title";
import Btn from "../components/common/Buttons/Button";
import { Card } from "@mui/material";
import "./../styles/app.less";
import "../components/common/Title/Title";

const ConfigSummary = () => {
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch({
      type: "set-is-config-ready",
      payload: true,
    });
  };

  const renderUsersSummary = users.map((user) => {
    return (
      <Card key={user.id} className="centered centered-column summary-card">
        <Title text={user.name} variant="h6" className="title" />
        <Stack className="centered centered-column">
          {user.quizData.selectedCatg?.map((category) => (
            <Chip
              key={category.id ? category.id : null}
              label={category.name ? category.name : "All categories"}
              variant="outlined"
              style={{ border: `1px solid #ccc`, margin: "0 5px" }}
              className="centered centered-column"
            />
          ))}
        </Stack>
      </Card>
    );
  });
  return (
    <Box className="centered centered-column box">
      <Title text="Config Summary" variant="h4" className="subtitle" />
      <Box>
        <Box className="centered centered-row config-summary-box">
          {renderUsersSummary}
        </Box>
        <Box className="centered centered-column box">
          <Title
            text={`${users[0].name} answers the questions first`}
            className="subtitle"
          />
          <Btn
            name="Start"
            variant="contained"
            color="success"
            handler={handleStart}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigSummary;
