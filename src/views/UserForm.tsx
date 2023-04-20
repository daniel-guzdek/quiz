import React, { useRef } from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import SelectNumberOfPlayers from "../components/SelectNumberOfPlayers";

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
    if (players_mode === "single_player") {
      dispatch({
        type: "add-user-name",
        payload: {
          id: 1,
          name:
            inputs[0].ref?.current!.value === ""
              ? `Player 1`
              : inputs[0].ref?.current!.value,
        },
      });
    } else {
      const createRefsDynamically = (number_of_players: number) => {
        for (let i = 0; i < number_of_players; i++) {
          dispatch({
            type: "add-user-name",
            payload: {
              id: i + 1,
              name:
                inputs[i].ref?.current!.value === ""
                  ? `Player ${i + 1}`
                  : inputs[i].ref?.current!.value,
            },
          });
        }
      };

      createRefsDynamically(number_of_players);
    }
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
        <input
          id={input.id}
          key={input.key}
          ref={input.ref}
          type={input.type}
          placeholder={input.placeholder}
          defaultValue={`Player ${index + 1}`}
        />
      );
    })
    .slice(0, number_of_players);

  const renderForm = (
    <form onSubmit={userFormHandler}>
      {renderNameInputs}
      <button type="submit" onClick={() => displayGameModesPanel()}>
        Done
      </button>
    </form>
  );

  return (
    <div>
      <p>
        PLAYERS MODE:
        {players_mode === ""
          ? "?"
          : players_mode === "single_player"
          ? "SINGLE PLAYER"
          : "MULTI PLAYER"}
      </p>
      <h2>Settings:</h2>
      {players_mode === "single_player" ? (
        <div>
          <button onClick={() => dispatch({ type: "set-multi-player-mode" })}>
            Multi Player
          </button>
          {renderForm}
        </div>
      ) : (
        <div>
          {!is_form_valid && <SelectNumberOfPlayers />}
          {!number_of_players ? null : renderForm}
        </div>
      )}
    </div>
  );
};

export default UserForm;
