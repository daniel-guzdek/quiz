import React from "react";
import Button from "@mui/material/Button";

interface IBtnProps {
  type?: "button" | "submit" | "reset" | undefined;
  name?: string;
  variant: "text" | "outlined" | "contained" | undefined;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  className?: string;
  endIcon?: JSX.Element;
  disabled?: boolean;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
}

const Btn = ({
  type,
  name,
  variant,
  color,
  className,
  endIcon,
  disabled,
  handler,
}: IBtnProps) => {
  return (
    <Button
      type={type}
      onClick={handler}
      variant={variant}
      color={color}
      disabled={disabled}
      className={className}
      endIcon={endIcon}
    >
      {name}
    </Button>
  );
};

export default Btn;
