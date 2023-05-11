import React from "react";
import { useSelector } from "react-redux";
import SelectQuestionsCategory from "../components/SelectQuestionsCategory";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/app_types";
import { loadQuestionsChecker } from "../utils/loadQuestionsChecker";

const SelectedQuizModeSettingsView: React.FC = () => {
  const quiz_mode = useSelector(
    (state: RootState): string => state.quiz["quiz_mode"]
  );
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);

  const renderSelectQuestionsForEachUser =
    users?.length &&
    users.map((user) => {
      console.log(users[user.id - 1].quiz_data.questionsShouldLoad);
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
    <div style={{ display: loadQuestionsChecker(users) ? "none" : "block" }}>
      <h2>{quiz_mode}</h2>
      <main>
        <h3>Select category</h3>
        <div>{renderSelectQuestionsForEachUser}</div>
      </main>
    </div>
  );
};

export default SelectedQuizModeSettingsView;
