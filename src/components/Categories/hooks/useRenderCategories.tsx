import { useCallback } from "react";
import { Category } from "../../../ts/types/appTypes";
import { ICategoriesProps } from "../models/ICategoriesProps";
import { quizConfig } from "../../../quizConfig/quizConfig";
import CategoryBtn from "../components/CategoryBtn";
import { displayDefaultCategoriesCheck } from "../../../utils/displayDefaultCategoriesCheck";
import { renderInfo } from "../../../utils/renderInfo";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Title from "../../common/Title/Title";
import { renderSelectedCategories } from "../utils/renderSelectedCategories";
import Typography from "@mui/material/Typography";
import Btn from "../../common/Buttons/Button";
import "../../../styles/app.less";
import { mode } from "../../../constants/constants";

interface IRenderCategoriesProps extends ICategoriesProps {
  userName: string;
  actualUserId: number;
  setSelectedCategories: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  questionsShouldLoad: boolean;
  selectedCategories: Category[];
  handleResetCategories: () => void;
  disabledResetBtn: () => boolean;
  selectRandomCategories: (
    categoriesNumber: number
  ) => (event: React.MouseEvent<Element, MouseEvent>) => void;
  disabledRandomCategoriesBtn: () => boolean | undefined;
  handleAcceptCategories: () => void;
  disabledAcceptBtn: () => boolean;
  hiddenCategoriesButtons: () => string;
}

const useRenderCategories = ({
  userId,
  userName,
  setCustomUserId,
  setSelectedCategories,
  selectedCategories,
  handleResetCategories,
  disabledResetBtn,
  selectRandomCategories,
  disabledRandomCategoriesBtn,
  handleAcceptCategories,
  disabledAcceptBtn,
  hiddenCategoriesButtons,
}: IRenderCategoriesProps) => {
  const renderCategoriesButtons = quizConfig.categories.map((category) => {
    return (
      <CategoryBtn
        key={category.id}
        categoryId={category.id}
        categoryName={category.name}
        categoryIcon={category.name}
        bgColor={category.color}
        selectedUserId={userId}
        selectedUserName={userName}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        disabled
      />
    );
  });

  const renderCategoriesView = useCallback(
    (actualUserId, userId, userName, users, quizMode, questionsShouldLoad) => {
      const displayContentCondition = () => {
        if (quizMode === mode.ON_THE_EDGE) {
          return actualUserId === userId ? "flex" : "none";
        } else {
          return displayDefaultCategoriesCheck(
            userId,
            users,
            questionsShouldLoad
          );
        }
      };

      const getInfoText = () => {
        if (quizMode === mode.ON_THE_EDGE) {
          return `${renderInfo(userId, userName, users)}`;
        } else {
          return `${userName}, please select categories}`;
        }
      };

      return (
        <Box
          key={userId}
          className="centered centered-column"
          style={{
            display: displayContentCondition(),
            paddingBottom: "60px",
          }}
        >
          <Title text={getInfoText()} variant="h6" mb={3} />
          <Box className="centered centered-column">
            <Stack
              direction="row"
              spacing={1}
              mb={2}
              className="centered centered-row"
            >
              <Title text="Your Categories:" variant="subtitle2" />
              <Stack direction="row" spacing={1}>
                {quizMode !== mode.ON_THE_EDGE
                  ? renderSelectedCategories(selectedCategories)
                  : renderSelectedCategories(
                      users[userId - 1].quizData.selectedCategories
                    )}
              </Stack>
            </Stack>

            {quizMode === mode.ON_THE_EDGE && (
              <Stack
                direction="row"
                spacing={1}
                mb={2}
                className="centered centered-row"
                style={{
                  display:
                    users.length % 2 === 1 && userId === users.length
                      ? "none"
                      : "flex",
                }}
              >
                <Typography variant="subtitle2">
                  {`Selected Categories for ${
                    users[setCustomUserId(userId, users) - 1].name
                  }:`}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {renderSelectedCategories(
                    users[setCustomUserId(userId, users) - 1].quizData
                      .selectedCategories
                  )}
                </Stack>
              </Stack>
            )}

            <Box className="centered centered-row">
              <Btn
                name="Reset Categories"
                handler={handleResetCategories}
                disabled={disabledResetBtn()}
                variant="outlined"
                color="error"
              />
              {quizMode === mode.ON_THE_EDGE ? (
                <Btn
                  name="Random Cat."
                  className="MuiButton-root btn-space"
                  handler={selectRandomCategories(quizConfig.maxNumCategories)}
                  disabled={disabledRandomCategoriesBtn()}
                  variant="contained"
                  color="primary"
                />
              ) : null}
              <Btn
                name="DONE!"
                handler={handleAcceptCategories}
                disabled={disabledAcceptBtn()}
                variant="contained"
                color="success"
              />
            </Box>
          </Box>
          <Box className={hiddenCategoriesButtons()}>
            {selectedCategories.length === quizConfig.maxNumCategories
              ? null
              : renderCategoriesButtons}
          </Box>
        </Box>
      );
    },
    [
      disabledAcceptBtn,
      disabledRandomCategoriesBtn,
      disabledResetBtn,
      handleAcceptCategories,
      handleResetCategories,
      renderCategoriesButtons,
      hiddenCategoriesButtons,
      selectRandomCategories,
      selectedCategories,
      setCustomUserId,
    ]
  );

  return {
    renderCategoriesView,
  };
};

export default useRenderCategories;
