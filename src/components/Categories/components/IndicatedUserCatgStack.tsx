import Stack from "@mui/material/Stack";
import useUsersData from "../../../hooks/useUsersData";
import { getIndicatedUserId } from "../../../utils/getIndicatedUserId";
import { Category, User } from "../../../ts/types/appTypes";
import Title from "../../common/Title/Title";

interface IIndicatedUserCatgStackProps {
  quizMode: string;
  users: User[];
  userId: number;
  renderSelectedCatg: (catg: Category[]) => JSX.Element[] | "-";
}

const IndicatedUserCatgStack = ({
  quizMode,
  users,
  userId,
  renderSelectedCatg,
}: IIndicatedUserCatgStackProps) => {
  const { isOddUsersNum, isLastUserId, indicatedUser, indicatedUserCatg } =
    useUsersData({
      quizMode,
      users,
      userId,
      getIndicatedUserId,
    });

  const stackStyles = {
    flexDirection: "row",
    spacing: 1,
    mb: 2,
    style: {
      display: isOddUsersNum && isLastUserId ? "none" : "flex",
    },
  };

  return (
    <Stack sx={stackStyles} className="centered centered-row">
      <Title
        text={`Selected Categories for ${indicatedUser.name}:`}
        variant="subtitle2"
      />
      <Stack direction="row" spacing={1}>
        {renderSelectedCatg(indicatedUserCatg)}
      </Stack>
    </Stack>
  );
};

export default IndicatedUserCatgStack;
