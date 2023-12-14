import { Category } from "../../../ts/types/appTypes";
import { Chip } from "@mui/material";

export const renderSelectedCategories = (categories: Category[]) => {
  return categories.length
    ? categories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          variant="outlined"
          style={{ border: `1px solid #ccc`, margin: "0 5px" }}
        />
      ))
    : "-";
};
