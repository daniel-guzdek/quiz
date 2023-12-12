import React from "react";
import { useDispatch } from "react-redux";
import { ImUser, ImUsers } from "react-icons/im";
import Stack from "@mui/material/Stack";
import Btn from "../components/common/Buttons/Button";
import Title from "../components/common/Title/Title";
import "../styles/app.less";

const PlayersMode: React.FC = () => {
  const dispatch = useDispatch();

  const handleDispatchPlayersMode = (playersModeTypeName: string) => {
    dispatch({ type: playersModeTypeName });
  };

  return (
    <>
      <Title text="Select Players mode" variant="h6" mt={4} mb={2} />
      <Stack direction="row" spacing={3} mb={2}>
        <Btn
          name="Single Player"
          variant="outlined"
          color="success"
          endIcon={<ImUser />}
          handler={() => handleDispatchPlayersMode("set-single-player-mode")}
        />
        <Btn
          name="Multi Player"
          variant="outlined"
          color="primary"
          endIcon={<ImUsers />}
          handler={() => handleDispatchPlayersMode("set-multi-player-mode")}
        />
      </Stack>
    </>
  );
};

export default PlayersMode;
