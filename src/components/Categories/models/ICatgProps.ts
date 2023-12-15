import { User } from "../../../ts/types/appTypes";

export interface ICatgProps {
  quizMode: string;
  users: User[];
  userId: number;
  getIndicatedUserId: (userId: number, users: User[]) => number;
}
