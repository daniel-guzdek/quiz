import Typography from "@mui/material/Typography";
import "./Title.less";

type TitleProps = {
  text?: string | undefined | null;
  component?: "div" | "span";
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  color?: string;
  className?: string;
};

const Title = ({ text, variant, className }: TitleProps) => {
  return (
    <Typography variant={variant} className={className}>
      {text}
    </Typography>
  );
};

export default Title;
