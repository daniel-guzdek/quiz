import { useCallback } from "react";
import { Category } from "../../../ts/types/appTypes";
import { ICatgProps } from "../models/ICatgProps";
import { quizConfig } from "../../../quizConfig/quizConfig";
import CatgBtn from "../components/CatgBtn";
import { displayDefaultCatgCheck } from "./../../../utils/displayDefaultCatgCheck";
import { renderInstruction } from "../../../utils/renderInstruction";
import Box from "@mui/material/Box";
import Title from "../../common/Title/Title";
import { renderSelectedCatg } from "../utils/renderSelectedCatg";
import { mode } from "../../../constants/constants";
import CatgActionBtnStack from "../components/CatgActionBtnStack";
import UsersCatgStack from "../components/UsersCatgStack";
import "../../../styles/app.less";

interface IRenderCatgProps extends ICatgProps {
  userName: string;
  actualUserId: number;
  setSelectedCatg: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  questionsShouldLoad: boolean;
  selectedCatg: Category[];
  handleResetCatg: () => void;
  disabledResetBtn: () => boolean;
  selectRandomCatg: (
    catgNumber: number
  ) => (event: React.MouseEvent<Element, MouseEvent>) => void;
  disabledRandomCatgBtn: () => boolean | undefined;
  handleAcceptCatg: () => void;
  disabledAcceptBtn: () => boolean;
  hideCatgButtons: () => string;
}

const useRenderCatg = ({
  userId,
  userName,
  setSelectedCatg,
  selectedCatg,
  handleResetCatg,
  disabledResetBtn,
  selectRandomCatg,
  disabledRandomCatgBtn,
  handleAcceptCatg,
  disabledAcceptBtn,
  hideCatgButtons,
}: IRenderCatgProps) => {
  const renderCatgButtons = quizConfig.catg.map((category) => {
    return (
      <CatgBtn
        key={category.id}
        categoryId={category.id}
        categoryName={category.name}
        categoryIcon={category.name}
        bgColor={category.color}
        selectedUserId={userId}
        selectedUserName={userName}
        setSelectedCatg={setSelectedCatg}
        selectedCatg={selectedCatg}
        disabled={selectedCatg.length === quizConfig.maxCatgNum}
      />
    );
  });

  const renderCatgView = useCallback(
    (actualUserId, userId, userName, users, quizMode, questionsShouldLoad) => {
      const showContentCondition = () => {
        if (quizMode === mode.ON_THE_EDGE) {
          return actualUserId === userId ? "flex" : "none";
        } else {
          return displayDefaultCatgCheck(userId, users, questionsShouldLoad);
        }
      };

      const getInstruction = () =>
        quizMode === mode.ON_THE_EDGE
          ? renderInstruction(userId, userName, users)
          : ` ${userName}, please select categories`;

      return (
        <Box
          key={userId}
          className="centered centered-column"
          style={{
            display: showContentCondition(),
          }}
        >
          <Title text={getInstruction()} className="info" />
          <UsersCatgStack
            quizMode={quizMode}
            users={users}
            userId={userId}
            selectedCatg={selectedCatg}
            renderSelectedCatg={renderSelectedCatg}
          />
          <CatgActionBtnStack
            quizMode={quizMode}
            handleResetCatg={handleResetCatg}
            handleAcceptCatg={handleAcceptCatg}
            disabledResetBtn={disabledResetBtn}
            selectRandomCatg={selectRandomCatg}
            disabledRandomCatgBtn={disabledRandomCatgBtn}
            disabledAcceptBtn={disabledAcceptBtn}
            selectedCatg={selectedCatg}
            hideCatgButtons={hideCatgButtons}
          />
          <Box className={hideCatgButtons()}>
            {selectedCatg.length === quizConfig.maxCatgNum
              ? null
              : renderCatgButtons}
          </Box>
        </Box>
      );
    },
    [
      disabledAcceptBtn,
      disabledRandomCatgBtn,
      disabledResetBtn,
      handleAcceptCatg,
      handleResetCatg,
      renderCatgButtons,
      hideCatgButtons,
      selectRandomCatg,
      selectedCatg,
    ]
  );

  return {
    renderCatgView,
  };
};

export default useRenderCatg;
