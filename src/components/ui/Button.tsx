import MuiButton, { ButtonProps } from "@mui/material/Button";

interface Props extends Pick<
  ButtonProps,
  | "variant"
  | "color"
  | "disabled"
  | "type"
  | "endIcon"
  | "startIcon"
  | "sx"
  | "fullWidth"
> {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ label, onClick, className, ...rest }: Props) => (
  <MuiButton onClick={onClick} className={className} {...rest}>
    {label}
  </MuiButton>
);

export default Button;
