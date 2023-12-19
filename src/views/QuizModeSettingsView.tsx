import React from "react";
import { useSelector } from "react-redux";
import QuestionsCatg from "../components/Categories/components/QuestionsCatg";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/appTypes";
import { questionsCanLoad } from "../utils/loadQuestionsChecker";
import Box from "@mui/material/Box";
import Title from "../components/common/Title/Title";

const QuizModeSettingsView: React.FC = () => {
  const quizMode = useSelector(
    (state: RootState): string => state.quiz["quizMode"]
  );
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const renderSelectQuestionsForEachUser =
    users?.length &&
    users.map((user, index) => {
      return (
        <QuestionsCatg
          key={user.id}
          userId={user.id}
          playerName={user.name}
          players={users}
          questionsShouldLoad={users[index].quizData.questionsShouldLoad}
        />
      );
    });

  return (
    <Box
      className={`${
        questionsCanLoad(users) ? "hidden" : "centered centered-column box"
      }`}
    >
      <Title text={quizMode} variant="h4" className="subtitle" />
      <Box>{renderSelectQuestionsForEachUser}</Box>
    </Box>
  );
};

export default QuizModeSettingsView;
