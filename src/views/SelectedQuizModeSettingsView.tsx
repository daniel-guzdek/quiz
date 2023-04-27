import React from "react";
import { useSelector } from "react-redux";
import SelectQuestionsCategory from "../components/SelectQuestionsCategory";
import { RootState } from "../state/reducers";
import { User } from "../ts/types/app_types";

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
        />
      );
    });

  return (
    <div>
      <h2>{quiz_mode}</h2>
      <main>
        <h3>Select category</h3>
        <div>{renderSelectQuestionsForEachUser}</div>
      </main>
    </div>
  );
};

export default SelectedQuizModeSettingsView;
