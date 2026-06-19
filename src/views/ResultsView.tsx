import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetStore } from "../store/quizSlice";

const ResultsView = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((s) => s.quiz);

  const sorted = [...users].sort((a, b) => b.correctAnswers - a.correctAnswers);
  const isMultiPlayer = users.length > 1;
  const topScore = sorted[0]?.correctAnswers ?? 0;
  const winners = sorted.filter((u) => u.correctAnswers === topScore);
  const isTie = winners.length > 1;

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
      {isMultiPlayer &&
        (isTie ? (
          <Typography variant="h6" color="text.secondary">
            Winners: {winners.map((w) => w.name).join(" & ")}
          </Typography>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Winner: {winners[0]?.name}
          </Typography>
        ))}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {sorted.map((user, rank) => (
          <Card
            key={user.id}
            elevation={3}
            sx={{
              minWidth: 180,
              border: rank === 0 ? "2px solid" : "1px solid",
              borderColor: rank === 0 ? "success.main" : "divider",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={600}>
                {user.name}
              </Typography>
              <Typography variant="h3" color="success.main" fontWeight={700}>
                {user.correctAnswers}
              </Typography>
              <Box
                mt={1}
                display="flex"
                gap={0.5}
                justifyContent="center"
                flexWrap="wrap"
              >
                <Chip
                  label={`\u2713 ${user.correctAnswers}`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label={`\u2717 ${user.incorrectAnswers}`}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => dispatch(resetStore())}
        sx={{ px: 6, py: 1.5, mt: 2 }}
      >
        Play Again
      </Button>
    </Box>
  );
};

export default ResultsView;
