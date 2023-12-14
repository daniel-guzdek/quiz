import { User } from "../../../ts/types/appTypes";

export interface ICategoriesProps {
  quizMode: string;
  users: User[];
  userId: number;
  setCustomUserId: (userId: number, users: User[]) => number;
}
