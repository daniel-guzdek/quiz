import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SelectNumberOfPlayers = () => {
  const { number_of_players } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    if (String(event.target.value) === "1") {
      dispatch({
        type: "set-single-player-mode",
      });
    } else {
      dispatch({
        type: "select-number-of-players",
        payload: Number(event.target.value),
      });
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 135 }}>
        <InputLabel id="demo-simple-select-helper-label">
          Number of Players
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={number_of_players}
          label="Number of Players"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectNumberOfPlayers;
