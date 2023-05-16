import React, { useCallback, useState } from "react";
import { quizConfig } from "../quizConfig/quizConfig";
import Typography from "@mui/material/Typography";
import SingleCategoryOptionButton from "./SingleCategoryOptionButton";
import { User } from "../ts/types/app_types";
import { Category } from "../ts/types/app_types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { renderInfo } from "../utils/renderInfo";
import { setOtherPlayerId } from "../utils/setOtherPlayerId";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { displayDefaultCategoriesCheck } from "../utils/displayDefaultCategoriesCheck";

type SelectQuestionsCategoryProps = {
  playerId: number;
  playerName: string;
  players: User[];
  questionsShouldLoad: boolean;
};

const SelectQuestionsCategory: React.FC<SelectQuestionsCategoryProps> = (
  props: SelectQuestionsCategoryProps
) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[] | []>(
    []
  );

  const { quiz_mode } = useSelector((state: RootState) => state.quiz);
  const actual_user_id = useSelector(
    (state: RootState): number => state.quiz["actual_user_id"]
  );
  const dispatch = useDispatch();

  const handleAcceptCategoriesBtn = useCallback(() => {
    if (quiz_mode === "ON THE EDGE") {
      dispatch({
        type: "set-actual-user-id",
        payload:
          props.playerId + 1 > props.players.length ? 1 : props.playerId + 1,
      });

      dispatch({
        type: "questions-should-load",
        payload: {
          userId:
            typeof props.playerId !== "undefined" &&
            setOtherPlayerId(props.playerId, props.players),
          questionsShouldLoad: true,
        },
      });
    } else {
      dispatch({
        type: "set-player-quiz-data",
        payload: {
          userId: props.playerId,
          selectedCategories: selectedCategories,
          questionsShouldLoad: true,
        },
      });

      dispatch({
        type: "questions-should-load",
        payload: {
          userId: props.playerId,
          questionsShouldLoad: true,
        },
      });
    }
  }, [dispatch, props.playerId, props.players, quiz_mode, selectedCategories]);

  const renderCategoryOptionsButtons = quizConfig.categories.map((category) => {
    return (
      <SingleCategoryOptionButton
        key={category.id}
        categoryId={category.id}
        categoryName={category.name}
        categoryIcon={category.name}
        bgColor={category.color}
        urlValue={category.valueForUrl}
        selectedUserId={props.playerId}
        selectedUserName={props.playerName}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
    );
  });

  const renderSelectedCategories = selectedCategories.length
    ? selectedCategories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          variant="outlined"
          style={{ border: `1px solid #ccc`, margin: "0 5px" }}
        />
      ))
    : "-";

  const handleResetCategories = useCallback(() => {
    if (quiz_mode === "ON THE EDGE" && props.players.length > 1) {
      dispatch({
        type: "reset-user-categories",
        payload: {
          userId: setOtherPlayerId(props.playerId, props.players),
          users: props.players,
          questionsShouldLoad: false,
        },
      });
      setSelectedCategories([]);
    } else {
      dispatch({
        type: "reset-user-categories",
        payload: {
          userId: props.playerId,
          users: props.players,
          questionsShouldLoad: false,
        },
      });
      setSelectedCategories([]);
    }
  }, [props.playerId, props.players, dispatch, quiz_mode]);

  const selectRandomCategoriesForUser = useCallback(
    (categoriesNumber: number) => {
      return (event: React.MouseEvent) => {
        event.preventDefault();

        let arr = [];

        while (arr.length < categoriesNumber) {
          let r = Math.floor(Math.random() * quizConfig.categories.length) + 1;
          if (arr.indexOf(r) === -1) arr.push(r);
        }

        const categoriesObjects = arr.map((el) => {
          const categoryObject = quizConfig.categories.find(
            (category) => category.id === el
          );
          return {
            id: el,
            name: categoryObject?.name,
            color: categoryObject?.color,
            questions: [],
          };
        });

        dispatch({
          type: "set-player-quiz-data",
          payload: {
            userId:
              typeof props.playerId !== "undefined" &&
              setOtherPlayerId(props.playerId, props.players),
            selectedCategories: categoriesObjects,
            questionsShouldLoad: false,
          },
        });
      };
    },
    [dispatch, props.playerId, props.players]
  );

  const renderDefaultUserCategoriesView = (
    <Box
      key={props.playerId}
      style={{
        width: "100%",
        display: displayDefaultCategoriesCheck(
          props.playerId,
          props.players,
          props.questionsShouldLoad
        ),
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "60px",
      }}
    >
      <Typography variant="h6" gutterBottom mb={2}>
        {props.playerName}, please select categories
      </Typography>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          mb={2}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">Selected Categories:</Typography>
          <Stack direction="row" spacing={1}>
            {renderSelectedCategories}
          </Stack>
        </Stack>
        <Box>
          <Button
            onClick={handleResetCategories}
            disabled={
              props.questionsShouldLoad || selectedCategories.length === 0
            }
            variant="outlined"
            color="error"
            style={{ margin: "0 10px" }}
          >
            Reset Categories
          </Button>
          <Button
            onClick={handleAcceptCategoriesBtn}
            disabled={
              props.questionsShouldLoad || selectedCategories.length === 0
            }
            variant="contained"
            color="success"
          >
            DONE!
          </Button>
        </Box>
      </Box>
      <Box
        style={{
          display:
            props.players[props.playerId - 1].quiz_data.selectedCategories
              .length === 3
              ? "none"
              : "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          marginTop: 50,
          justifyContent: "space-evenly",
        }}
      >
        {renderCategoryOptionsButtons}
      </Box>
    </Box>
  );

  const renderCustomUserCategoriesView = useCallback(
    (playerId, playerName, users) => {
      return (
        <Box
          style={{
            width: "100%",
            display: actual_user_id === props.playerId ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "60px",
          }}
        >
          <Box
            key={playerId}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom mb={2}>
              {typeof playerId === "number" &&
                renderInfo(playerId, playerName, users)}
            </Typography>
            <Box>
              <Stack
                direction="row"
                spacing={1}
                mb={2}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">Your Categories:</Typography>
                <Stack direction="row" spacing={1}>
                  {props.players[playerId - 1].quiz_data.selectedCategories
                    .length
                    ? props.players[
                        playerId - 1
                      ].quiz_data.selectedCategories.map((category) => (
                        <Chip
                          key={category.id}
                          label={category.name}
                          variant="outlined"
                          style={{ border: `1px solid #ccc`, margin: "0 5px" }}
                        />
                      ))
                    : "-"}
                </Stack>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                mb={2}
                style={{
                  display:
                    props.players.length % 2 === 1 &&
                    props.playerId === props.players.length
                      ? "none"
                      : "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">
                  {`Selected Categories for ${
                    props.players[
                      setOtherPlayerId(props.playerId, props.players) - 1
                    ].name
                  }:`}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {props.players[
                    setOtherPlayerId(props.playerId, props.players) - 1
                  ].quiz_data.selectedCategories.length
                    ? props.players[
                        setOtherPlayerId(props.playerId, props.players) - 1
                      ].quiz_data.selectedCategories.map((category) => (
                        <Chip
                          key={category.id}
                          label={category.name}
                          variant="outlined"
                          style={{ border: `1px solid #ccc`, margin: "0 5px" }}
                        />
                      ))
                    : "-"}
                </Stack>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleResetCategories}
                  disabled={
                    props.players[
                      setOtherPlayerId(props.playerId, props.players) - 1
                    ].quiz_data.selectedCategories.length === 0 ||
                    props.players[
                      setOtherPlayerId(props.playerId, props.players) - 1
                    ].quiz_data.questionsShouldLoad ||
                    (props.players.length % 2 === 1 &&
                      props.playerId === props.players.length)
                  }
                  variant="outlined"
                  color="error"
                  style={{ margin: "0 10px" }}
                >
                  Reset Cat.
                </Button>
                <Button
                  onClick={selectRandomCategoriesForUser(3)}
                  disabled={
                    props.players[
                      setOtherPlayerId(props.playerId, props.players) - 1
                    ].quiz_data.questionsShouldLoad ||
                    (props.players.length % 2 === 1 &&
                      props.playerId === props.players.length &&
                      props.players[props.players.length - 1].quiz_data
                        .selectedCategories.length === 3)
                  }
                  variant="contained"
                  color="primary"
                  style={{ margin: "0 10px 0 0" }}
                >
                  Random Cat.
                </Button>
                <Button
                  onClick={handleAcceptCategoriesBtn}
                  disabled={
                    props.players[
                      setOtherPlayerId(props.playerId, props.players) - 1
                    ].quiz_data.selectedCategories.length === 0 ||
                    props.players[
                      setOtherPlayerId(props.playerId, props.players) - 1
                    ].quiz_data.questionsShouldLoad
                  }
                  variant="contained"
                  color="success"
                >
                  DONE!
                </Button>
              </Stack>
            </Box>
            <Stack
              direction="row"
              style={{
                display:
                  props.players[
                    setOtherPlayerId(props.playerId, props.players) - 1
                  ].quiz_data.selectedCategories.length === 3 ||
                  (props.players.length % 2 === 1 &&
                    props.playerId === props.players.length) ||
                  props.players[
                    setOtherPlayerId(props.playerId, props.players) - 1
                  ].quiz_data.questionsShouldLoad
                    ? "none"
                    : "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                marginTop: 50,
                justifyContent: "space-evenly",
              }}
            >
              {renderCategoryOptionsButtons}
            </Stack>
          </Box>
        </Box>
      );
    },
    [
      handleAcceptCategoriesBtn,
      renderCategoryOptionsButtons,
      selectRandomCategoriesForUser,
      props.players,
      props.playerId,
      actual_user_id,
      handleResetCategories,
    ]
  );

  return (
    <Box>
      {quiz_mode === "MY THING" || quiz_mode === "MY THING VS. MY THING"
        ? renderDefaultUserCategoriesView
        : renderCustomUserCategoriesView(
            props.playerId,
            props.playerName,
            props.players
          )}
    </Box>
  );
};

export default SelectQuestionsCategory;
