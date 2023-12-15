import { Category } from "../../../ts/types/appTypes";

export interface ICategoryBtnProps {
  bgColor: string;
  categoryIcon: string;
  categoryId: number;
  categoryName: string;
  disabled: boolean;
  selectedCatg: Category[];
  selectedUserId: number;
  selectedUserName: string;
  setSelectedCatg: React.Dispatch<React.SetStateAction<Category[] | []>>;
}
