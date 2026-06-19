import Typography, { TypographyProps } from "@mui/material/Typography";

interface Props extends Pick<
  TypographyProps,
  "variant" | "color" | "component" | "sx"
> {
  text: string;
  className?: string;
}

const Title = ({ text, className, ...rest }: Props) => (
  <Typography className={className} {...rest}>
    {text}
  </Typography>
);

export default Title;
