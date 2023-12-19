import Box from "@mui/material/Box";
import React from "react";
import Btn from "../../common/Buttons/Button";
import { mode } from "../../../constants/constants";
import { quizConfig } from "../../../quizConfig/quizConfig";
import { Category } from "../../../ts/types/appTypes";

interface ICatgActionBtnStackProps {
  quizMode: string;
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
        className="btn-reset-catg btn-space"
      />
      {quizMode === mode.ON_THE_EDGE ? (
        <Btn
          name="Random Cat."
          className="btn-rand-catg btn-space"
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
        className="btn-accept-catg btn-space"
      />
    </Box>
  );
};

export default CatgActionBtnStack;
