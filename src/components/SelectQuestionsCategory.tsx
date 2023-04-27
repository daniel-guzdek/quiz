import React, { useState } from "react";
import { quizConfig } from "../quizConfig/quizConfig";
import SingleCategoryOptionButton from "./SingleCategoryOptionButton";
import { User } from "../ts/types/app_types";
import { Category } from "../ts/types/app_types";
import { useDispatch } from "react-redux";

type SelectQuestionsCategoryProps = {
  playerId: number | undefined;
  playerName: string | undefined;
  players: User[];
};

const SelectQuestionsCategory: React.FC<SelectQuestionsCategoryProps> = (
  props: SelectQuestionsCategoryProps
) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[] | []>(
    []
  );

  const dispatch = useDispatch();

  const handleAcceptCategoriesBtn = () => {
    dispatch({
      type: "set-player-quiz-data",
      payload: {
        userId: props.playerId,
        selectedCategories: selectedCategories,
      },
    });
  };

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

  const handleResetCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div key={props.playerId}>
      <h2>{props.playerName}</h2>
      <div>{renderCategoryOptionsButtons}</div>
      <div>Selected Categories: {renderSelectedCategories}</div>
      <button onClick={handleResetCategories}>Reset Categories</button>
      <button
        onClick={handleAcceptCategoriesBtn}
      >{`${props.playerName} DONE!`}</button>
    </div>
  );
};

export default SelectQuestionsCategory;
