import { User } from "../../../ts/types/appTypes";

export type QuestionsCategoriesProps = {
  playerId: number;
  playerName: string;
  players: User[];
  questionsShouldLoad: boolean;
};
