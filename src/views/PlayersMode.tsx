import React from "react";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ImUser, ImUsers } from "react-icons/im";
import Stack from "@mui/material/Stack";

const PlayersMode: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom mt={6} mb={3} textAlign="center">
        Select Players mode
      </Typography>
      <Stack direction="row" spacing={3}>
        <Button
          onClick={() => dispatch({ type: "set-single-player-mode" })}
          variant="outlined"
          color="success"
          endIcon={<ImUser />}
        >
          Single Player
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: "set-multi-player-mode" });
            dispatch({
              type: "select-number-of-players",
              payload: 2,
            });
          }}
          variant="outlined"
          color="primary"
          endIcon={<ImUsers />}
        >
          Multi Player
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default PlayersMode;
