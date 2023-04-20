import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";

const SelectNumberOfPlayers = () => {
  const { number_of_players } = useSelector((state: RootState) => state.quiz);
  const select_input_ref = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();

  const handleChange = () => {
    if (select_input_ref.current?.value === "1") {
      dispatch({
        type: "set-single-player-mode",
      });
    } else {
      dispatch({
        type: "select-number-of-players",
        payload: Number(select_input_ref.current?.value),
      });
    }
  };

  return (
    <div>
      <label>
        Select number of Players:
        <select
          value={number_of_players}
          ref={select_input_ref}
          onChange={handleChange}
        >
          <option value={""}>select value</option>
          <option value={"1"}>1</option>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
          <option value={"4"}>4</option>
          <option value={"5"}>5</option>
        </select>
      </label>
    </div>
  );
};

export default SelectNumberOfPlayers;
