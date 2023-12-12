import React, { useCallback, useMemo, useState } from "react";
import { quizConfig } from "../quizConfig/quizConfig";
import Typography from "@mui/material/Typography";
import CategoryOptionButton from "./CategoryOptionButton";
import { User } from "../ts/types/appTypes";
import { Category } from "../ts/types/appTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { renderInfo } from "../utils/renderInfo";
import { setOtherPlayerId } from "../utils/setOtherPlayerId";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { displayDefaultCategoriesCheck } from "../utils/displayDefaultCategoriesCheck";
import Title from "./common/Title/Title";
import Btn from "./common/Buttons/Button";
import "../styles/app.less";

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

  const { quizMode } = useSelector((state: RootState) => state.quiz);
  const actualUserId = useSelector(
    (state: RootState): number => state.quiz["actualUserId"]
  );
  const dispatch = useDispatch();

  const questionsShouldLoadPayload = useMemo(
    () => ({
      userId:
        quizMode === "ON THE EDGE"
          ? setOtherPlayerId(props.playerId, props.players)
          : props.playerId,
      questionsShouldLoad: true,
    }),
    [props.playerId, props.players, quizMode]
  );

  const getPlayerQuizDataPayload = useCallback(
    (userId: number, questionsShouldLoad: boolean) => ({
      userId,
      selectedCategories: selectedCategories,
      questionsShouldLoad,
    }),
    [selectedCategories]
  );

  const handleAcceptCategoriesBtn = useCallback(() => {
    if (quizMode === "ON THE EDGE") {
      dispatch({
        type: "set-actual-user-id",
        payload:
          props.playerId + 1 > props.players.length ? 1 : props.playerId + 1,
      });
      dispatch({
        type: "questions-should-load",
        payload: questionsShouldLoadPayload,
      });
    } else {
      dispatch({
        type: "set-player-quiz-data",
        payload: getPlayerQuizDataPayload(props.playerId, true),
      });
      dispatch({
        type: "questions-should-load",
        payload: questionsShouldLoadPayload,
      });
    }
  }, [
    dispatch,
    props.playerId,
    props.players,
    quizMode,
    getPlayerQuizDataPayload,
    questionsShouldLoadPayload,
  ]);

  const renderCategoryOptionsButtons = quizConfig.categories.map((category) => {
    return (
      <CategoryOptionButton
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
        disabled
      />
    );
  });

  const renderSelectedCategories = (categories: Category[]) => {
    return categories.length
      ? categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            variant="outlined"
            style={{ border: `1px solid #ccc`, margin: "0 5px" }}
          />
        ))
      : "-";
  };

  const resetCatPayload = useMemo(
    () => ({
      userId:
        quizMode === "ON THE EDGE" && props.players.length > 1
          ? setOtherPlayerId(props.playerId, props.players)
          : props.playerId,
      users: props.players,
      questionsShouldLoad: false,
    }),
    [quizMode, props.playerId, props.players]
  );

  const handleResetCategories = useCallback(() => {
    dispatch({
      type: "reset-user-categories",
      payload: resetCatPayload,
    });
    setSelectedCategories([]);
  }, [dispatch, resetCatPayload]);

  const disabledResetBtnCondition = useCallback(() => {
    if (quizMode === "ON THE EDGE") {
      return (
        props.players[setOtherPlayerId(props.playerId, props.players) - 1]
          .quizData.selectedCategories.length === 0 ||
        props.players[setOtherPlayerId(props.playerId, props.players) - 1]
          .quizData.questionsShouldLoad ||
        (props.players.length % 2 === 1 &&
          props.playerId === props.players.length)
      );
    } else {
      return props.questionsShouldLoad || !selectedCategories.length;
    }
  }, [
    props.playerId,
    props.players,
    props.questionsShouldLoad,
    quizMode,
    selectedCategories.length,
  ]);

  const disabledRandomCatBtnCondition = useCallback(() => {
    if (quizMode === "ON THE EDGE") {
      return (
        props.players[setOtherPlayerId(props.playerId, props.players) - 1]
          .quizData.questionsShouldLoad ||
        (props.players.length % 2 === 1 &&
          props.playerId === props.players.length &&
          props.players[props.players.length - 1].quizData.selectedCategories
            .length === 3)
      );
    }
  }, [props.playerId, props.players, quizMode]);

  const disabledDoneBtnCondition = useCallback(() => {
    if (quizMode === "ON THE EDGE") {
      return (
        props.players[setOtherPlayerId(props.playerId, props.players) - 1]
          .quizData.selectedCategories.length === 0 ||
        props.players[setOtherPlayerId(props.playerId, props.players) - 1]
          .quizData.questionsShouldLoad
      );
    } else {
      return props.questionsShouldLoad || !selectedCategories.length;
    }
  }, [
    props.playerId,
    props.players,
    props.questionsShouldLoad,
    quizMode,
    selectedCategories.length,
  ]);

  const selectRandomCategoriesForUser = useCallback(
    (categoriesNumber: number) => {
      return (event: React.MouseEvent) => {
        event.preventDefault();

        let arr = [];

        while (arr.length < categoriesNumber) {
          let rand =
            Math.floor(Math.random() * quizConfig.categories.length) + 1;
          if (arr.indexOf(rand) === -1) arr.push(rand);
        }

        const categories = arr.map((el) => {
          const category = quizConfig.categories.find(
            (category) => category.id === el
          );
          return {
            id: el,
            name: category?.name,
            color: category?.color,
            questions: [],
          };
        });

        dispatch({
          type: "set-player-quiz-data",
          payload: {
            userId: setOtherPlayerId(props.playerId, props.players),
            selectedCategories: categories,
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
      className="centered centered-column"
      style={{
        display: displayDefaultCategoriesCheck(
          props.playerId,
          props.players,
          props.questionsShouldLoad
        ),
        paddingBottom: "60px",
      }}
    >
      <Title
        text={`${props.playerName}, please select categories}`}
        variant="h6"
        mb={3}
      />
      <Box className="centered centered-column">
        <Stack
          direction="row"
          spacing={1}
          mb={2}
          className="centered centered-row"
        >
          <Title text="Selected Categories:" variant="subtitle2" />
          <Stack direction="row" spacing={1}>
            {renderSelectedCategories(selectedCategories)}
          </Stack>
        </Stack>
        <Box className="centered centered-row">
          <Btn
            name="Reset Categories"
            className="MuiButton-root btn-space"
            handler={handleResetCategories}
            disabled={disabledResetBtnCondition()}
            variant="outlined"
            color="error"
          />
          <Btn
            name="DONE!"
            handler={handleAcceptCategoriesBtn}
            disabled={disabledDoneBtnCondition()}
            variant="contained"
            color="success"
          />
        </Box>
      </Box>
      <Box
        className={
          props.players[props.playerId - 1].quizData.selectedCategories
            .length === 3
            ? "hidden"
            : "categoriesWrapper"
        }
      >
        {selectedCategories.length === 3 ? null : renderCategoryOptionsButtons}
      </Box>
    </Box>
  );

  const renderCustomUserCategoriesView = useCallback(
    (playerId, playerName, users) => {
      return (
        <Box
          key={playerId}
          className="centered centered-column"
          style={{
            display: actualUserId === playerId ? "flex" : "none",
            paddingBottom: "60px",
          }}
        >
          <Title
            text={`${renderInfo(playerId, playerName, users)}`}
            variant="h6"
            mb={3}
          />
          <Box className="centered centered-column">
            <Stack
              direction="row"
              spacing={1}
              mb={2}
              className="centered centered-row"
            >
              <Title text="Your Categories:" variant="subtitle2" />
              <Stack direction="row" spacing={1}>
                {renderSelectedCategories(
                  props.players[playerId - 1].quizData.selectedCategories
                )}
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
                {renderSelectedCategories(
                  props.players[
                    setOtherPlayerId(props.playerId, props.players) - 1
                  ].quizData.selectedCategories
                )}
              </Stack>
            </Stack>
            <Box className="centered centered-row">
              <Btn
                name="Reset Categories"
                handler={handleResetCategories}
                disabled={disabledResetBtnCondition()}
                variant="outlined"
                color="error"
              />
              <Btn
                name="Random Cat."
                className="MuiButton-root btn-space"
                handler={selectRandomCategoriesForUser(3)}
                disabled={disabledRandomCatBtnCondition()}
                variant="contained"
                color="primary"
              />
              <Btn
                name="DONE!"
                handler={handleAcceptCategoriesBtn}
                disabled={disabledDoneBtnCondition()}
                variant="contained"
                color="success"
              />
            </Box>
          </Box>
          <Box
            className={
              props.players[setOtherPlayerId(props.playerId, props.players) - 1]
                .quizData.selectedCategories.length === 3 ||
              (props.players.length % 2 === 1 &&
                props.playerId === props.players.length) ||
              props.players[setOtherPlayerId(props.playerId, props.players) - 1]
                .quizData.questionsShouldLoad
                ? "hidden"
                : "categoriesWrapper"
            }
          >
            {selectedCategories.length === 3
              ? null
              : renderCategoryOptionsButtons}
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
      actualUserId,
      selectedCategories,
      handleResetCategories,
      disabledResetBtnCondition,
      disabledRandomCatBtnCondition,
      disabledDoneBtnCondition,
    ]
  );

  return (
    <Box>
      {quizMode === "MY THING" || quizMode === "MY THING VS. MY THING"
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
