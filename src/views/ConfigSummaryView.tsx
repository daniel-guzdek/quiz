import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsConfigReady } from "../store/quizSlice";

const ConfigSummaryView = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((s) => s.quiz);
  const isMultiPlayer = users.length > 1;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        pt: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {users.map((user) => (
          <Card key={user.id} elevation={2} sx={{ minWidth: 200 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {user.name}
              </Typography>
              <Stack spacing={0.5} alignItems="center">
                {user.quizData.selectedCategories.length > 0 ? (
                  user.quizData.selectedCategories.map((cat) => (
                    <Chip
                      key={cat.id}
                      label={cat.name}
                      size="small"
                      sx={{
                        borderColor: cat.color,
                        color: cat.color,
                        borderWidth: 1.5,
                      }}
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Chip
                    label="All categories"
                    size="small"
                    variant="outlined"
                  />
                )}
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                {user.quizData.questions.length} questions
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {isMultiPlayer && (
        <Typography variant="body1" color="text.secondary">
          {users[0]?.name} answers first
        </Typography>
      )}

      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => dispatch(setIsConfigReady(true))}
        sx={{ px: 6, py: 1.5 }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default ConfigSummaryView;
