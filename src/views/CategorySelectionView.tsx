import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../store/hooks";
import CategorySelector from "../components/CategorySelector/CategorySelector";
import { questionsCanLoad } from "../utils/questionsCanLoad";

const CategorySelectionView = () => {
  const { quizMode, users } = useAppSelector((s) => s.quiz);

  if (questionsCanLoad(users)) return null;

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
      <Typography variant="h4" fontWeight={700}>
        {quizMode}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {users.map((user) => (
          <CategorySelector
            key={user.id}
            userId={user.id}
            userName={user.name}
            users={users}
            quizMode={quizMode}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategorySelectionView;
