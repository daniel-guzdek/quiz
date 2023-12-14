import React from "react";
import { useSelector } from "react-redux";
import QuestionsCategories from "../components/Categories/components/QuestionsCategories";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/appTypes";
import { questionsCanLoad } from "../utils/loadQuestionsChecker";
import Box from "@mui/material/Box";
import Title from "../components/common/Title/Title";

const SelectedQuizModeSettingsView: React.FC = () => {
  const quizMode = useSelector(
    (state: RootState): string => state.quiz["quizMode"]
  );
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const renderSelectQuestionsForEachUser =
    users?.length &&
    users.map((user, index) => {
      return (
        <QuestionsCategories
          key={user.id}
          playerId={user.id}
          playerName={user.name}
          players={users}
          questionsShouldLoad={users[index].quizData.questionsShouldLoad}
        />
      );
    });

  return (
    <Box
      className={`${
        questionsCanLoad(users) ? "hidden" : "centered centered-column"
      }`}
      marginTop={"40px"}
    >
      <Title text={quizMode} variant="h4" gutterBottom />
      <Box>{renderSelectQuestionsForEachUser}</Box>
    </Box>
  );
};

export default SelectedQuizModeSettingsView;
