import { useEffect, useState, SetStateAction } from "react";
import { Category, SelectedCategories } from "../ts/types/app_types";

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

  useEffect(() => {
    !props.selectedCategories.length && setIsDisabled(false);
  }, [props.selectedCategories]);

  const handleCategoryBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const button: HTMLButtonElement = event.currentTarget;
    // setClickedButton(button.name);

    props.setSelectedCategories((selectedCategories: SelectedCategories) => [
      ...selectedCategories,
      {
        id: props.categoryId,
        name: props.categoryName,
        questions: [],
      },
    ]);

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
