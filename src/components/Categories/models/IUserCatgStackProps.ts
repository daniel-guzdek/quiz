import { Category, User } from "../../../ts/types/appTypes";

export interface IUserCatgStackProps {
  quizMode: string;
  users: User[];
  userId: number;
  selectedCatg: Category[];
  renderSelectedCatg: (catg: Category[]) => JSX.Element[] | "-";
}
