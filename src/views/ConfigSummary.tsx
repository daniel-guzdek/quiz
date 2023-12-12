import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { User } from "../ts/types/appTypes";
import { RootState } from "../state/reducers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Category as ICategory } from "../ts/enums/appEnums";

const ConfigSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [allCategoriesIds, setAllCategoriesIds] = useState<number[]>([]);
  // const [urls, setUrls] = useState<string[]>([]);

  const { quizMode } = useSelector((state: RootState) => state.quiz);
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);
  const actualUserId = useSelector(
    (state: RootState): number => state.quiz["actualUserId"]
  );
  const dispatch = useDispatch();

  const [questionsUrls, SetQuestionsUrls] = useState<any[]>([]);

  useEffect(() => {
    console.log(users);
    let categoriesIds: number[] = [];
    users.length &&
      users.forEach((user) => {
        console.log(user.quizData.selectedCategories);

        user.quizData.selectedCategories.forEach((category) =>
          categoriesIds.push(category.id)
        );
      });

    console.log(categoriesIds);

    const urls = categoriesIds.map(
      (id) => `https://opentdb.com/api.php?amount=10&category=${id}`
    );

    SetQuestionsUrls(urls);
  }, []);

  useEffect(() => {
    console.log(questionsUrls);

    let URL1 = questionsUrls[0];
    let URL2 = questionsUrls[1];

    console.log(URL1, URL2);

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);

    Promise.all([promise1, promise2]).then((res) => console.log(res));
  }, [questionsUrls]);

  const renderUsersSummary =
    users.length &&
    users.map((user) => {
      return (
        <Box
          key={user.id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" mt={2}>
            {user.name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "70px",
            }}
          >
            {user.quizData.selectedCategories.length ? (
              user.quizData.selectedCategories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  variant="outlined"
                  style={{ border: `1px solid #ccc`, margin: "0 5px" }}
                />
              ))
            ) : (
              <Chip
                key={0}
                label="All categories"
                variant="outlined"
                style={{ border: `1px solid #ccc`, margin: "0 5px" }}
              />
            )}
          </Stack>
        </Box>
      );
    });
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h4" gutterBottom mt={2} mb={4}>
        Summary
      </Typography>
      <Box>
        <Box>
          <Box>{renderUsersSummary}</Box>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            // onClick={
            //   handleFetchAndDispatchQuestions
            // }
            // onClick={fetchData}
          >
            Start
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigSummary;
