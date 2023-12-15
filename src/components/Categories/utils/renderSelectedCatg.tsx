import { Category } from "../../../ts/types/appTypes";
import { Chip } from "@mui/material";

export const renderSelectedCatg = (catg: Category[]) => {
  return catg.length
    ? catg.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          variant="outlined"
          style={{ border: `1px solid #ccc`, margin: "0 5px" }}
        />
      ))
    : "-";
};
