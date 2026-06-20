import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setUserCategories,
  setUserQuestions,
  resetUserCategories,
  setActiveUserId,
} from "../../store/quizSlice";
import { getQuestionsByCategoryId } from "../../data/questions";
import {
  AVAILABLE_CATEGORIES,
  QUESTIONS_PER_PLAYER,
} from "../../config/quizConfig";
import { getIndicatedUserId } from "../../utils/getIndicatedUserId";
import type { Category, User } from "../../types";

interface Props {
  userId: number;
  userName: string;
  users: User[];
  quizMode: string;
}

const CategorySelector = ({ userId, userName, users, quizMode }: Props) => {
  const dispatch = useAppDispatch();
  const activeUserId = useAppSelector((s) => s.quiz.activeUserId);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const isOnTheEdge = quizMode === "ON THE EDGE";
  const indicatedUserId = isOnTheEdge
    ? getIndicatedUserId(userId, users)
    : userId;
  const indicatedUser = users.find((u) => u.id === indicatedUserId);
  const isOddLastPlayer =
    isOnTheEdge && indicatedUserId === userId && users.length % 2 === 1;

  useEffect(() => {
    if (isOnTheEdge && activeUserId === userId && isOddLastPlayer) {
      const randomCatg =
        AVAILABLE_CATEGORIES[
          Math.floor(Math.random() * AVAILABLE_CATEGORIES.length)
        ];
      dispatch(
        setUserCategories({
          userId,
          categories: [randomCatg],
          questionsShouldLoad: false,
        }),
      );
      dispatch(
        setUserQuestions({
          userId,
          questions: getQuestionsByCategoryId(
            randomCatg.id,
            QUESTIONS_PER_PLAYER,
          ),
        }),
      );
      dispatch(setActiveUserId(userId + 1));
    }
  }, [activeUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  const user = users.find((u) => u.id === userId);
  const isVisible = isOnTheEdge
    ? activeUserId === userId && !isOddLastPlayer
    : !user?.quizData.questionsShouldLoad;

  if (!isVisible) return null;

  const instruction = isOnTheEdge
    ? `${userName}, select a category for ${indicatedUser?.name}`
    : `${userName}, select your category`;

  const handleSelectCategory = (catg: Category) => {
    setSelectedCategory(catg);
    if (isOnTheEdge) {
      dispatch(
        setUserCategories({
          userId: indicatedUserId,
          categories: [catg],
          questionsShouldLoad: false,
        }),
      );
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
    dispatch(resetUserCategories(indicatedUserId));
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_CATEGORIES.length);
    handleSelectCategory(AVAILABLE_CATEGORIES[randomIndex]);
  };

  const handleAccept = () => {
    if (!selectedCategory) return;

    const questions = getQuestionsByCategoryId(
      selectedCategory.id,
      QUESTIONS_PER_PLAYER,
    );

    dispatch(
      setUserCategories({
        userId: indicatedUserId,
        categories: [selectedCategory],
        questionsShouldLoad: true,
      }),
    );
    dispatch(setUserQuestions({ userId: indicatedUserId, questions }));

    if (isOnTheEdge) {
      dispatch(setActiveUserId(userId + 1));
    }

    setSelectedCategory(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        minWidth: 300,
      }}
    >
      <Typography variant="h6" fontWeight={600} textAlign="center">
        {instruction}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 30,
        }}
      >
        {selectedCategory && (
          <Chip
            label={selectedCategory.name}
            onDelete={handleReset}
            sx={{
              borderColor: selectedCategory.color,
              color: selectedCategory.color,
              borderWidth: 2,
            }}
            variant="outlined"
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
        }}
      >
        {AVAILABLE_CATEGORIES.map((catg) => (
          <Button
            key={catg.id}
            variant={
              selectedCategory?.id === catg.id ? "contained" : "outlined"
            }
            disabled={!!selectedCategory && selectedCategory.id !== catg.id}
            onClick={() => handleSelectCategory(catg)}
            size="small"
            sx={{
              borderColor: catg.color,
              color: selectedCategory?.id === catg.id ? "#fff" : catg.color,
              backgroundColor:
                selectedCategory?.id === catg.id ? catg.color : "transparent",
              "&:hover": {
                backgroundColor: catg.color,
                color: "#fff",
              },
            }}
          >
            {catg.name}
          </Button>
        ))}
      </Box>

      <Stack direction="row" spacing={1} style={{ marginTop: "16px" }}>
        <Button
          variant="outlined"
          color="warning"
          size="small"
          disabled={!selectedCategory}
          onClick={handleReset}
        >
          Reset
        </Button>
        {isOnTheEdge && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            disabled={!!selectedCategory}
            onClick={handleRandom}
          >
            Random
          </Button>
        )}
        <Button
          variant="contained"
          color="success"
          size="small"
          disabled={!selectedCategory}
          onClick={handleAccept}
        >
          Confirm
        </Button>
      </Stack>
    </Box>
  );
};

export default CategorySelector;
