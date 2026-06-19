import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ImUser, ImUsers } from "react-icons/im";
import { useAppDispatch } from "../store/hooks";
import { setSinglePlayerMode, setMultiPlayerMode } from "../store/quizSlice";

const UserModeView = () => {
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        pt: 6,
      }}
    >
      <Box display="flex" gap={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ImUser />}
          onClick={() => dispatch(setSinglePlayerMode())}
          sx={{ px: 4, py: 2 }}
        >
          Single Player
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<ImUsers />}
          onClick={() => dispatch(setMultiPlayerMode())}
          sx={{ px: 4, py: 2 }}
        >
          Multi Player
        </Button>
      </Box>
    </Box>
  );
};

export default UserModeView;
