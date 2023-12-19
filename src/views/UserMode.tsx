import React from "react";
import { useDispatch } from "react-redux";
import { ImUser, ImUsers } from "react-icons/im";
import Stack from "@mui/material/Stack";
import Btn from "../components/common/Buttons/Button";
import "../styles/app.less";

const UserMode: React.FC = () => {
  const dispatch = useDispatch();

  const handleDispatchUsersMode = (usersModeTypeName: string) => {
    dispatch({ type: usersModeTypeName });
  };

  return (
    <>
      <Stack direction="row" spacing={3} className="box">
        <Btn
          name="Single Player"
          variant="outlined"
          color="success"
          endIcon={<ImUser />}
          handler={() => handleDispatchUsersMode("set-single-player-mode")}
        />
        <Btn
          name="Multi Player"
          variant="outlined"
          color="primary"
          endIcon={<ImUsers />}
          handler={() => handleDispatchUsersMode("set-multi-player-mode")}
        />
      </Stack>
    </>
  );
};

export default UserMode;
