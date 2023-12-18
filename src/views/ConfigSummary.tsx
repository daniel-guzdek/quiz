// import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import Typography from "@mui/material/Typography";
import { User } from "../ts/types/appTypes";
import { RootState } from "../state/reducers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import { Category as ICategory } from "../ts/enums/appEnums";

const ConfigSummary = () => {
  // const { quizMode } = useSelector((state: RootState) => state.quiz);
  const users = useSelector((state: RootState): User[] => state.quiz["users"]);
  // const actualUserId = useSelector(
  //   (state: RootState): number => state.quiz["actualUserId"]
  // );
  const dispatch = useDispatch();

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
            {user.quizData.selectedCatg.length ? (
              user.quizData.selectedCatg.map((category) => (
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
                label="All catg"
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
