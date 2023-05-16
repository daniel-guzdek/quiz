import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import SelectQuestionsCategory from "../components/SelectQuestionsCategory";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/app_types";
import { loadQuestionsChecker } from "../utils/loadQuestionsChecker";
import Box from "@mui/material/Box";

const SelectedQuizModeSettingsView: React.FC = () => {
  const quiz_mode = useSelector(
    (state: RootState): string => state.quiz["quiz_mode"]
  );
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const renderSelectQuestionsForEachUser =
    users?.length &&
    users.map((user) => {
      return (
        <SelectQuestionsCategory
          key={user.id}
          playerId={user.id}
          playerName={user.name}
          players={users}
          questionsShouldLoad={users[user.id - 1].quiz_data.questionsShouldLoad}
        />
      );
    });

  return (
    <Box
      style={{
        display: loadQuestionsChecker(users) ? "none" : "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {quiz_mode}
      </Typography>
      <Box>{renderSelectQuestionsForEachUser}</Box>
    </Box>
  );
};

export default SelectedQuizModeSettingsView;
