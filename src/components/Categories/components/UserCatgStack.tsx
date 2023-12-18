import Stack from "@mui/material/Stack";
import Title from "../../common/Title/Title";
import { mode } from "../../../constants/constants";
import useUsersData from "../../../hooks/useUsersData";
import { getIndicatedUserId } from "../../../utils/getIndicatedUserId";
import { IUserCatgStackProps } from "../models/IUserCatgStackProps";

const UserCatgStack = ({
  quizMode,
  users,
  userId,
  selectedCatg,
  renderSelectedCatg,
}: IUserCatgStackProps) => {
  const { userCatg } = useUsersData({
    quizMode,
    users,
    userId,
    getIndicatedUserId,
  });

  return (
    <Stack direction="row" spacing={1} mb={2} className="centered centered-row">
      <Title text="Your Categories:" variant="subtitle2" />
      <Stack direction="row" spacing={1}>
        {quizMode !== mode.ON_THE_EDGE
          ? renderSelectedCatg(selectedCatg)
          : renderSelectedCatg(userCatg)}
      </Stack>
    </Stack>
  );
};

export default UserCatgStack;
