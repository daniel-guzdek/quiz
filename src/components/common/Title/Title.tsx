import Typography from "@mui/material/Typography";

type TitleProps = {
  text?: string;
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
  mt?: number;
  mb?: number;
  gutterBottom?: boolean;
};

const Title = ({
  text,
  variant,
  className,
  mt,
  mb,
  gutterBottom,
}: TitleProps) => {
  return (
    <Typography
      variant={variant}
      className={className}
      mt={mt}
      mb={mb}
      gutterBottom={gutterBottom}
    >
      {text}
    </Typography>
  );
};

export default Title;
