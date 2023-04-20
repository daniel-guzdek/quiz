import React from "react";
import { useDispatch } from "react-redux";

const PlayersMode: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Choose Quiz mode</h2>
      <button onClick={() => dispatch({ type: "set-single-player-mode" })}>
        Single Player
      </button>
      <button onClick={() => dispatch({ type: "set-multi-player-mode" })}>
        Multi Player
      </button>
    </div>
  );
};

export default PlayersMode;
