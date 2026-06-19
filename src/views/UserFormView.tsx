import React, { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { ImUser, ImUsers } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setSinglePlayerMode,
  setMultiPlayerMode,
  setNumberOfPlayers,
  addUser,
  clearUsers,
  setIsFormValid,
} from "../store/quizSlice";
import type { User } from "../types";

const MAX_PLAYERS = 5;

const UserFormView = () => {
  const dispatch = useAppDispatch();
  const { playersMode, usersNum } = useAppSelector((s) => s.quiz);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(MAX_PLAYERS).fill(null),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(clearUsers());

    for (let i = 0; i < usersNum; i++) {
      const name = inputRefs.current[i]?.value?.trim() || `Player ${i + 1}`;
      const user: User = {
        id: i + 1,
        name,
        correctAnswers: 0,
        incorrectAnswers: 0,
        quizData: {
          questionsShouldLoad: false,
          selectedCategories: [],
          questions: [],
        },
      };
      dispatch(addUser(user));
    }

    dispatch(setIsFormValid(true));
  };

  const handlePlayersCountChange = (e: SelectChangeEvent<number>) => {
    dispatch(setNumberOfPlayers(Number(e.target.value)));
  };

  const isSinglePlayer = playersMode === "Single Player";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        pt: 4,
      }}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Button
          variant={isSinglePlayer ? "contained" : "outlined"}
          startIcon={<ImUser />}
          onClick={() => dispatch(setSinglePlayerMode())}
        >
          Single Player
        </Button>
        <Button
          variant={!isSinglePlayer ? "contained" : "outlined"}
          startIcon={<ImUsers />}
          onClick={() => dispatch(setMultiPlayerMode())}
        >
          Multi Player
        </Button>
      </Box>

      {!isSinglePlayer && (
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Number of players</InputLabel>
          <Select
            value={usersNum}
            label="Number of players"
            onChange={handlePlayersCountChange}
          >
            {Array.from({ length: MAX_PLAYERS - 1 }, (_, i) => i + 2).map(
              (n) => (
                <MenuItem key={n} value={n}>
                  {n} Players
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {isSinglePlayer ? "Enter name" : "Enter names"}
        </Typography>

        {Array.from({ length: usersNum }, (_, i) => (
          <TextField
            key={i}
            label={`Player ${i + 1}`}
            defaultValue={`Player ${i + 1}`}
            inputRef={(el) => {
              inputRefs.current[i] = el;
            }}
            fullWidth
            size="small"
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          color="success"
          size="large"
          disabled={usersNum === 0}
          sx={{ mt: 1, px: 6 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default UserFormView;
