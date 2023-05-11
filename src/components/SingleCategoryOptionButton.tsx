import { useEffect, useState, SetStateAction } from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Category, SelectedCategories } from "../ts/types/app_types";
import { setCustomModePlayerId } from "../utils/setCustomModePlayerId";

type SingleCategoryOptionButtonProps = {
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  bgColor: string;
  urlValue: number;
  selectedUserId: number | undefined;
  selectedUserName: string | undefined;
  setSelectedCategories: React.Dispatch<SetStateAction<Category[] | []>>;
  selectedCategories: Category[] | [];
};

const SingleCategoryOptionButton = (props: SingleCategoryOptionButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const { quiz_mode, users } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    !props.selectedCategories.length && setIsDisabled(false);
  }, [props.selectedCategories]);

  const handleCategoryBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (quiz_mode === "ON THE EDGE") {
      props.setSelectedCategories((selectedCategories: SelectedCategories) => [
        ...selectedCategories,
        {
          id: props.categoryId,
          name: props.categoryName,
          questions: [],
        },
      ]);
      dispatch({
        type: "set-player-quiz-data",
        payload: {
          userId:
            typeof props.selectedUserId !== "undefined" &&
            setCustomModePlayerId(props.selectedUserId, users),
          selectedCategories: [
            ...props.selectedCategories,
            { id: props.categoryId, name: props.categoryName, questions: [] },
          ],
          questionsShouldLoad: false,
        },
      });
    } else {
      props.setSelectedCategories((selectedCategories: SelectedCategories) => [
        ...selectedCategories,
        {
          id: props.categoryId,
          name: props.categoryName,
          questions: [],
        },
      ]);
    }

    setIsDisabled(true);
  };

  return (
    <button
      style={{ backgroundColor: props.bgColor }}
      onClick={(event) => handleCategoryBtn(event)}
      name={`btn_${props.categoryName}`}
      disabled={isDisabled}
    >
      <h3>{props.categoryName}</h3>
      <span>{props.categoryIcon}</span>
      <div>{props.selectedUserName}</div>
    </button>
  );
};

export default SingleCategoryOptionButton;
