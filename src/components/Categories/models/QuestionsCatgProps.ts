import { User } from "../../../ts/types/appTypes";

export type QuestionsCatgProps = {
  userId: number;
  playerName: string;
  players: User[];
  questionsShouldLoad: boolean;
};
