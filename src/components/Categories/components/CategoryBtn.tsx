import { useEffect, useState } from "react";
import { RootState } from "../../../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { SelectedCategories } from "../../../ts/types/appTypes";
import { setCustomUserId } from "../../../utils/setCustomUserId";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Title from "../../common/Title/Title";
import { ICategoryBtnProps } from "../models/ICategoryBtnProps";
import "../../../styles/app.less";
import { mode } from "../../../constants/constants";

const CategoryBtn = (props: ICategoryBtnProps) => {
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
    questions: [],
  };

  const handleCategoryBtn = () => {
    if (quizMode === mode.ON_THE_EDGE) {
      props.setSelectedCategories((selectedCategories: SelectedCategories) => [
        ...selectedCategories,
        categoryObj,
      ]);
      dispatch({
        type: "set-player-quiz-data",
        payload: {
          userId:
            props.selectedUserId &&
            setCustomUserId(props.selectedUserId, users),
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

export default CategoryBtn;
