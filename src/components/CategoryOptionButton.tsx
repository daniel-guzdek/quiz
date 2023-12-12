import { useEffect, useState, SetStateAction } from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Category, SelectedCategories } from "../ts/types/appTypes";
import { setOtherPlayerId } from "../utils/setOtherPlayerId";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Title from "./common/Title/Title";
import "../styles/app.less";

type CatOptionBtnProps = {
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  bgColor: string;
  urlValue: number;
  selectedUserId: number;
  selectedUserName: string;
  setSelectedCategories: React.Dispatch<SetStateAction<Category[]>>;
  selectedCategories: Category[];
  disabled: boolean;
};

const CategoryOptionButton = (props: CatOptionBtnProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const { quizMode, users } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    !props.selectedCategories.length && setIsDisabled(false);
  }, [props.selectedCategories]);

  const categoryObj = {
    id: props.categoryId,
    name: props.categoryName,
    color: props.bgColor,
    urlValue: props.urlValue,
    questions: [],
  };

  const handleCategoryBtn = () => {
    if (quizMode === "ON THE EDGE") {
      props.setSelectedCategories((selectedCategories: SelectedCategories) => [
        ...selectedCategories,
        categoryObj,
      ]);
      dispatch({
        type: "set-player-quiz-data",
        payload: {
          userId:
            props.selectedUserId &&
            setOtherPlayerId(props.selectedUserId, users),
          selectedCategories: [...props.selectedCategories, categoryObj],
          questionsShouldLoad: false,
        },
      });
    } else {
      props.setSelectedCategories((selectedCategories: SelectedCategories) => [
        ...selectedCategories,
        categoryObj,
      ]);
    }

    setIsDisabled(true);
  };

  const categoryCardStyles = {
    display: isDisabled ? "none" : "block",
    width: 180,
    height: 60,
    margin: "10px",
    border: "none",
    boxShadow: `${props.bgColor} 0px 1px 0px, ${props.bgColor} 0px 0px 8px`,
    cursor: "pointer",
  };

  return (
    <Card onClick={() => handleCategoryBtn()} sx={categoryCardStyles}>
      <CardContent className="centered centered-column">
        <Title text={props.categoryName} variant="subtitle2" />
      </CardContent>
    </Card>
  );
};

export default CategoryOptionButton;
