import { Category } from "../../../ts/types/appTypes";

export interface ICategoryBtnProps {
  bgColor: string;
  categoryIcon: string;
  categoryId: number;
  categoryName: string;
  disabled: boolean;
  selectedCategories: Category[];
  selectedUserId: number;
  selectedUserName: string;
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[] | []>>;
}
