import React, { useRef } from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import SelectPlayersNum from "../components/SelectPlayersNum";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Title from "../components/common/Title/Title";
import Btn from "../components/common/Buttons/Button";
import { ImUsers } from "react-icons/im";
import "../styles/app.less";

const UserForm: React.FC = () => {
  const { usersMode, usersNum, isFormValid } = useSelector(
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

    const dispatchUsers = (usersNum: number) => {
      for (let i = 0; i < usersNum; i++) {
        dispatch({
          type: "add-user-name",
          payload: {
            id: i + 1,
            name: inputs[i].ref?.current!.value
              ? inputs[i].ref?.current!.value
              : `Player ${i + 1}`,
            score: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            totalAnswers: 0,
            isWinner: false,
            quizData: {
              questionsShouldLoad: false,
              selectedCatg: [],
              questions: [],
            },
          },
        });
      }
    };

    dispatchUsers(usersNum);
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
    .slice(0, usersNum);

  const renderForm = (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={userFormHandler}
      className="centered centered-row"
      flexWrap="wrap"
    >
      {renderNameInputs}
      <Btn
        type="submit"
        name="Done"
        variant="contained"
        color="success"
        handler={displayGameModesPanel}
        className="btn-done"
      />
    </Box>
  );

  return (
    <Box className="centered centered-column">
      <Title text="Select number of Players" variant="h6" mt={4} mb={2} />
      <Title text={`mode: ${usersMode}`} variant="subtitle2" mb={2} />
      {usersMode === "Single Player" ? (
        <Box className="centered centered-column">
          <Btn
            name="Multi Player"
            variant="outlined"
            color="primary"
            endIcon={<ImUsers />}
            handler={() => dispatch({ type: "set-multi-player-mode" })}
          />
          <Box>{renderForm}</Box>
        </Box>
      ) : (
        <div>
          {isFormValid ? null : <SelectPlayersNum />}
          {usersNum ? renderForm : null}
        </div>
      )}
    </Box>
  );
};

export default UserForm;
