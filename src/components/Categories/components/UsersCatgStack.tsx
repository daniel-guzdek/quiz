import { mode } from "../../../constants/constants";
import { IUserCatgStackProps } from "../models/IUserCatgStackProps";
import IndicatedUserCatgStack from "./IndicatedUserCatgStack";
import UserCatgStack from "./UserCatgStack";

const UsersCatgStack = ({
  quizMode,
  users,
  userId,
  selectedCatg,
  renderSelectedCatg,
}: IUserCatgStackProps) => {
  return (
    <>
      <UserCatgStack
        quizMode={quizMode}
        users={users}
        userId={userId}
        selectedCatg={selectedCatg}
        renderSelectedCatg={renderSelectedCatg}
      />
      {quizMode === mode.ON_THE_EDGE && (
        <IndicatedUserCatgStack
          quizMode={quizMode}
          users={users}
          userId={userId}
          renderSelectedCatg={renderSelectedCatg}
        />
      )}
    </>
  );
};

export default UsersCatgStack;
