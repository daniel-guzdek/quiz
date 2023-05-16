import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { User } from "../ts/types/app_types";
import { RootState } from "../state/reducers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Category as ICategory } from "../ts/enums/app_enums";

const ConfigSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [allCategoriesIds, setAllCategoriesIds] = useState<number[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const { quiz_mode } = useSelector((state: RootState) => state.quiz);
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);
  const actual_user_id = useSelector(
    (state: RootState): number => state.quiz["actual_user_id"]
  );
  const dispatch = useDispatch();

  const handleFetchAndDispatchQuestions = () => {
    setIsLoading(true);
    if (quiz_mode === "OMNIBUS") {
      axios
        .get("https://opentdb.com/api.php?amount=15&type=multiple")
        .then((response) => {
          users.length &&
            users.map((user, index) => {
              return dispatch({
                type: "set-questions-for-each-user",
                payload: {
                  userId: index + 1,
                  allQuestions: response.data.results,
                },
              });
            });
        })
        .then(() => setIsLoading(false))
        .catch(() => setIsError(true));
    } else if (
      quiz_mode === "MY THING" ||
      quiz_mode === "MY THING VS. MY THING"
    ) {
      let arr: number[] = [];

      users.length &&
        users.map((user) => {
          user.quiz_data.selectedCategories.map((category) => {
            arr.push(category.id);
            return arr;
          });
          console.log(arr);
          setAllCategoriesIds([...allCategoriesIds, ...arr]);
          return arr;
        });
    }
  };

  useEffect(() => {
    console.log(urls);
  }, [urls]);

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
            {user.quiz_data.selectedCategories.length ? (
              user.quiz_data.selectedCategories.map((category) => (
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
            onClick={handleFetchAndDispatchQuestions}
          >
            Start
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigSummary;
