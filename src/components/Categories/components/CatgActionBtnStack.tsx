import Box from "@mui/material/Box";
import React from "react";
import Btn from "../../common/Buttons/Button";
import { mode } from "../../../constants/constants";
import { quizConfig } from "../../../quizConfig/quizConfig";
import { Category } from "../../../ts/types/appTypes";

interface ICatgActionBtnStackProps {
  quizMode: string;
  //     userName: string;
  //   actualUserId: number;
  //   setSelectedCatg: React.Dispatch<React.SetStateAction<[] | Category[]>>;
  //   questionsShouldLoad: boolean;
  selectedCatg: Category[];
  handleResetCatg: () => void;
  disabledResetBtn: () => boolean;
  selectRandomCatg: (
    catgNumber: number
  ) => (event: React.MouseEvent<Element, MouseEvent>) => void;
  disabledRandomCatgBtn: () => boolean | undefined;
  handleAcceptCatg: () => void;
  disabledAcceptBtn: () => boolean;
  hiddenCatgButtons: () => string;
  // handleResetCatg,handleAcceptCatg, disabledResetBtn, selectRandomCatg, disabledRandomCatgBtn, disabledAcceptBtn
}

const CatgActionBtnStack = ({
  quizMode,
  handleResetCatg,
  handleAcceptCatg,
  disabledResetBtn,
  selectRandomCatg,
  disabledRandomCatgBtn,
  disabledAcceptBtn,
}: ICatgActionBtnStackProps) => {
  return (
    <Box className="centered centered-row">
      <Btn
        name="Reset Cat."
        handler={handleResetCatg}
        disabled={disabledResetBtn()}
        variant="outlined"
        color="error"
      />
      {quizMode === mode.ON_THE_EDGE ? (
        <Btn
          name="Random Cat."
          className="MuiButton-root btn-space"
          handler={selectRandomCatg(quizConfig.maxCatgNum)}
          disabled={disabledRandomCatgBtn()}
          variant="contained"
          color="primary"
        />
      ) : null}
      <Btn
        name="ACCEPT"
        handler={handleAcceptCatg}
        disabled={disabledAcceptBtn()}
        variant="contained"
        color="success"
      />
    </Box>
  );
};

export default CatgActionBtnStack;
