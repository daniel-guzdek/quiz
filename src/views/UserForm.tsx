import React, { useRef } from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import SelectNumberOfPlayers from "../components/SelectNumberOfPlayers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ImUsers } from "react-icons/im";
import Button from "@mui/material/Button";

const UserForm: React.FC = () => {
  const { players_mode, number_of_players, is_form_valid } = useSelector(
    (state: RootState) => state.quiz
  );

  const inputs = [
    {
      key: 1,
      type: "text",
      placeholder: "First Player's name",
      id: "first-text-input",
      ref: useRef<HTMLInputElement>(null),
    },
    {
      key: 2,
      type: "text",
      placeholder: "Second Player's name",
      id: "second-text-input",
      ref: useRef<HTMLInputElement>(null),
    },
    {
      key: 3,
      type: "text",
      placeholder: "Third Player's name",
      id: "third-text-input",
      ref: useRef<HTMLInputElement>(null),
    },
    {
      key: 4,
      type: "text",
      placeholder: "Fourth Player's name",
      id: "fourth-text-input",
      ref: useRef<HTMLInputElement>(null),
    },
    {
      key: 5,
      type: "text",
      placeholder: "Fifth Player's name",
      id: "fifth-text-input",
      ref: useRef<HTMLInputElement>(null),
    },
  ];

  const dispatch = useDispatch();

  const userFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch({
      type: "clear-users-array",
      payload: [],
    });

    const dispatchUsers = (number_of_players: number) => {
      for (let i = 0; i < number_of_players; i++) {
        dispatch({
          type: "add-user-name",
          payload: {
            id: i + 1,
            name:
              inputs[i].ref?.current!.value === ""
                ? `Player ${i + 1}`
                : inputs[i].ref?.current!.value,
            score: 0,
            correct_answers: 0,
            incorrect_answers: 0,
            total_answers: 0,
            is_winner: false,
            quiz_data: {
              questionsShouldLoad: false,
              selectedCategories: [],
              allQuestions: [],
            },
          },
        });
      }
    };

    dispatchUsers(number_of_players);
  };

  const displayGameModesPanel = () => {
    dispatch({
      type: "set-is-form-valid",
      payload: true,
    });
  };

  const renderNameInputs = inputs
    .map((input, index) => {
      return (
        <TextField
          id="outlined-basic"
          label={input.placeholder}
          variant="outlined"
          key={input.key}
          inputRef={input.ref}
          type={input.type}
          placeholder={input.placeholder}
          defaultValue={`Player ${index + 1}`}
        />
      );
    })
    .slice(0, number_of_players);

  const renderForm = (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={userFormHandler}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {renderNameInputs}
      <Button
        type="submit"
        onClick={() => displayGameModesPanel()}
        variant="contained"
        color="success"
        style={{ width: "110px", height: "4em" }}
      >
        Done
      </Button>
    </Box>
  );

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom mb={4}>
        Select number of Players
      </Typography>
      <Typography variant="subtitle2" gutterBottom mb={4}>
        players mode:{" "}
        {players_mode === ""
          ? "?"
          : players_mode === "single_player"
          ? "SINGLE PLAYER"
          : "MULTI PLAYER"}
      </Typography>
      {players_mode === "single_player" ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            style={{ marginBottom: "30px" }}
          >
            Multi Player
          </Button>
          <Box>{renderForm}</Box>
        </Box>
      ) : (
        <div>
          {!is_form_valid && <SelectNumberOfPlayers />}
          {!number_of_players ? null : renderForm}
        </div>
      )}
    </Box>
  );
};

export default UserForm;
