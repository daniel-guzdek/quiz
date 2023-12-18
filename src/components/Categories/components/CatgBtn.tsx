import { useEffect, useState } from "react";
import { RootState } from "../../../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { SelectedCatg } from "../../../ts/types/appTypes";
import { getIndicatedUserId } from "../../../utils/getIndicatedUserId";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Title from "../../common/Title/Title";
import { ICategoryBtnProps } from "../models/ICatgBtnProps";
import { mode } from "../../../constants/constants";
import useUsersData from "../../../hooks/useUsersData";
import "../../../styles/app.less";

const CatgBtn = (props: ICategoryBtnProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const { quizMode, users } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();

  const { selectedUserId, selectedCatg, setSelectedCatg } = props;

  const { indicatedUserId } = useUsersData({
    quizMode,
    users,
    userId: selectedUserId,
    getIndicatedUserId,
  });

  useEffect(() => {
    !props.selectedCatg.length && setIsDisabled(false);
  }, [props.selectedCatg]);

  const catgObj = {
    id: props.categoryId,
    name: props.categoryName,
    color: props.bgColor,
  };

  const handleCategoryBtn = () => {
    if (quizMode === mode.ON_THE_EDGE) {
      setSelectedCatg((selectedCatg: SelectedCatg) => [
        ...selectedCatg,
        catgObj,
      ]);
      dispatch({
        type: "set-player-quiz-data",
        payload: {
          userId: selectedUserId && indicatedUserId,
          selectedCatg: [...selectedCatg, catgObj],
          questionsShouldLoad: false,
        },
      });
    } else {
      setSelectedCatg((selectedCatg: SelectedCatg) => [
        ...selectedCatg,
        catgObj,
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

export default CatgBtn;
