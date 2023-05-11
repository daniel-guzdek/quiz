import React, { useCallback, useEffect, useState } from "react";
import { quizConfig } from "../quizConfig/quizConfig";
import SingleCategoryOptionButton from "./SingleCategoryOptionButton";
import { User } from "../ts/types/app_types";
import { Category } from "../ts/types/app_types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import { renderInfo } from "../utils/renderInfo";
import { setCustomModePlayerId } from "../utils/setCustomModePlayerId";

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
  const [randomCategoriesIds, setRandomCategoriesIds] = useState<number[]>([]);

  const { quiz_mode } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();

  const handleAcceptCategoriesBtn = useCallback(() => {
    if (quiz_mode === "ON THE EDGE") {
      dispatch({
        type: "questions-should-load",
        payload: {
          userId:
            typeof props.playerId !== "undefined" &&
            setCustomModePlayerId(props.playerId, props.players),
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

  const renderSelectedCategories =
    selectedCategories.length &&
    selectedCategories.map((category) => (
      <span key={category.id} style={{ margin: "0 5px", border: "1px dotted" }}>
        {category.name}
      </span>
    ));

  const handleResetCategories = useCallback(() => {
    if (quiz_mode === "ON THE EDGE" && props.players.length > 1) {
      dispatch({
        type: "reset-user-categories",
        payload: {
          userId: setCustomModePlayerId(props.playerId, props.players),
          users: props.players,
        },
      });
      dispatch({
        type: "questions-should-load",
        payload: {
          userId: setCustomModePlayerId(props.playerId, props.players),
          questionsShouldLoad: false,
        },
      });
      setSelectedCategories([]);
    } else {
      setSelectedCategories([]);
    }
  }, [props.playerId, props.players, dispatch, quiz_mode]);

  // to check!
  const checkQuestionsShouldLoad = useCallback(() => {
    if (quiz_mode === "ON THE EDGE" && props.questionsShouldLoad) {
      return false;
    } else if (props.questionsShouldLoad) {
      return true;
    } else {
      return false;
    }
  }, [quiz_mode, props.questionsShouldLoad]);

  const selectRandomCategoriesForUser = useCallback(
    (categoriesNumber: number) => {
      return (event: React.MouseEvent) => {
        event.preventDefault();
        let arr = [];
        while (arr.length < categoriesNumber) {
          let r = Math.floor(Math.random() * quizConfig.categories.length) + 1;
          if (arr.indexOf(r) === -1) arr.push(r);
        }
        setRandomCategoriesIds(arr);
        const categoriesObjects = arr.map((el) => {
          const categoryObject = quizConfig.categories.find(
            (category) => category.id === el
          );
          return {
            id: el,
            name: categoryObject?.name,
          };
        });

        dispatch({
          type: "set-player-quiz-data",
          payload: {
            userId:
              typeof props.playerId !== "undefined" &&
              setCustomModePlayerId(props.playerId, props.players),
            selectedCategories: categoriesObjects,
            questionsShouldLoad: true,
          },
        });

        dispatch({
          type: "questions-should-load",
          payload: {
            userId:
              typeof props.playerId !== "undefined" &&
              setCustomModePlayerId(props.playerId, props.players),
            questionsShouldLoad: true,
          },
        });

        console.log(categoriesObjects);
        console.log(arr);
      };
    },
    [dispatch, props.playerId, props.players]
  );

  const renderDefaultUserCategoriesView = (
    <div key={props.playerId}>
      <h2>{props.playerName}</h2>
      <div style={{ display: props.questionsShouldLoad ? "none" : "block" }}>
        {renderCategoryOptionsButtons}
      </div>
      <div>Selected Categories: {renderSelectedCategories}</div>
      <button
        onClick={handleResetCategories}
        disabled={props.questionsShouldLoad}
      >
        Reset Categories
      </button>
      <button
        onClick={handleAcceptCategoriesBtn}
        disabled={selectedCategories.length === 0}
      >{`${props.playerName} DONE!`}</button>
    </div>
  );

  const renderCustomUserCategoriesView = useCallback(
    (playerId, playerName, users, categoriesNum, randomCategoriesIds) => {
      return (
        <main>
          <div key={playerId}>
            <h2>
              {typeof playerId === "number" &&
                renderInfo(playerId, playerName, users)}
            </h2>
            <div>{renderCategoryOptionsButtons}</div>
            <div>
              Selected Categories:{" "}
              {props.players[playerId - 1].quiz_data.selectedCategories
                .length &&
                props.players[playerId - 1].quiz_data.selectedCategories.map(
                  (category) => category.name
                )}
            </div>
            <button
              onClick={handleResetCategories}
              disabled={props.questionsShouldLoad}
            >
              Reset Categories
            </button>
            <button
              onClick={handleAcceptCategoriesBtn}
              disabled={checkQuestionsShouldLoad()}
            >{`${playerName} DONE!`}</button>
          </div>

          <button
            onClick={selectRandomCategoriesForUser(3)}
            disabled={categoriesNum === randomCategoriesIds.length}
          >
            Random Categories Id's
          </button>
        </main>
      );
    },
    [
      handleAcceptCategoriesBtn,
      renderCategoryOptionsButtons,
      selectRandomCategoriesForUser,
      props.players,
      handleResetCategories,
      checkQuestionsShouldLoad,
      props.questionsShouldLoad,
    ]
  );

  return (
    <main>
      {quiz_mode === "MY THING" || quiz_mode === "MY THING VS. MY THING"
        ? renderDefaultUserCategoriesView
        : renderCustomUserCategoriesView(
            props.playerId,
            props.playerName,
            props.players,
            quizConfig.quizModes[3].categoriesNum,
            randomCategoriesIds
          )}
    </main>
  );
};

export default SelectQuestionsCategory;
