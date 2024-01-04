import { useEffect, useState } from "react";
import { RootState } from "../../../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { SelectedCatg } from "../../../ts/types/appTypes";
import { getIndicatedUserId } from "../../../utils/getIndicatedUserId";
import Title from "../../common/Title/Title";
import { ICategoryBtnProps } from "../models/ICatgBtnProps";
import { mode } from "../../../constants/constants";
import useUsersData from "../../../hooks/useUsersData";
import { Box, Button, Theme } from "@mui/material";
import "../../../styles/app.less";
import "./CatgBtn.less";

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

  const catg = {
    id: props.categoryId,
    name: props.categoryName,
    color: props.bgColor,
  };

  const handleCategoryBtn = () => {
    if (quizMode === mode.ON_THE_EDGE) {
      setSelectedCatg((selectedCatg: SelectedCatg) => [...selectedCatg, catg]);
      dispatch({
        type: "set-player-quiz-data",
        payload: {
          userId: selectedUserId && indicatedUserId,
          selectedCatg: [...selectedCatg, catg],
          questionsShouldLoad: false,
        },
      });
    } else {
      setSelectedCatg((selectedCatg: SelectedCatg) => [...selectedCatg, catg]);
    }

    setIsDisabled(true);
  };

  const categoryBtnStyles = {
    display: isDisabled ? "none" : "block",
    p: 1,
    border: 1,
    m: 1,
    borderColor: (theme: Theme) => theme.palette.grey[300],
    backgroundColor: (theme: Theme) => theme.palette.grey[100],
    ":hover": {
      color: (theme: Theme) => theme.palette.success.main,
      borderColor: (theme: Theme) => theme.palette.success.main,
    },
  };

  return (
    <>
      <Box>
        <Button
          variant="outlined"
          size="large"
          sx={categoryBtnStyles}
          onClick={() => handleCategoryBtn()}
          disabled={isDisabled}
          className="catg-btn"
        >
          <Title text={props.categoryName} variant="body2" />
        </Button>
      </Box>
    </>
  );
};

export default CatgBtn;
