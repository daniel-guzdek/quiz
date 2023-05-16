import { useEffect, useState, SetStateAction } from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Category, SelectedCategories } from "../ts/types/app_types";
import { setOtherPlayerId } from "../utils/setOtherPlayerId";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type SingleCategoryOptionButtonProps = {
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  bgColor: string;
  urlValue: number;
  selectedUserId: number;
  selectedUserName: string;
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

  const handleCategoryBtn = () => {
    if (quiz_mode === "ON THE EDGE") {
      props.setSelectedCategories((selectedCategories: SelectedCategories) => [
        ...selectedCategories,
        {
          id: props.categoryId,
          name: props.categoryName,
          color: props.bgColor,
          questions: [],
        },
      ]);
      dispatch({
        type: "set-player-quiz-data",
        payload: {
          userId:
            typeof props.selectedUserId !== "undefined" &&
            setOtherPlayerId(props.selectedUserId, users),
          selectedCategories: [
            ...props.selectedCategories,
            {
              id: props.categoryId,
              name: props.categoryName,
              color: props.bgColor,
              questions: [],
            },
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
          color: props.bgColor,
          questions: [],
        },
      ]);
    }

    setIsDisabled(true);
  };

  return (
    <Card
      component="button"
      onClick={() => handleCategoryBtn()}
      sx={{
        width: 180,
        height: 60,
        margin: "10px",
        border: "none",
        boxShadow: `${props.bgColor} 0px 1px 0px, ${props.bgColor} 0px 0px 8px`,
      }}
      style={{ display: isDisabled ? "none" : "block", cursor: "pointer" }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.3s",
        }}
      >
        <Typography gutterBottom variant="subtitle2" component="div">
          {props.categoryName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleCategoryOptionButton;
