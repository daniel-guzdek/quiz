import { Category } from "../ts/enums/appEnums";
import { GiHorseHead, GiAxeSword, GiBookmark } from "react-icons/gi";

export const quizConfig = {
  quizModes: [
    {
      id: 1,
      variant: "MY THING",
      icon: <GiHorseHead />,
      isSinglePlayerMode: true,
      isMultiPlayerMode: false,
      description: "Questions from choosen subject",
    },
    {
      id: 2,
      variant: "MY THING VS. MY THING",
      icon: (
        <>
          <GiHorseHead />
          <GiHorseHead style={{ rotate: "180deg" }} />
        </>
      ),
      isSinglePlayerMode: false,
      isMultiPlayerMode: true,
      description: "Questions from choosen subject for each Player",
    },
    {
      id: 3,
      variant: "OMNIBUS",
      icon: <GiBookmark />,
      isSinglePlayerMode: true,
      isMultiPlayerMode: true,
      description: "Questions from all available subjects and topics",
    },
    {
      id: 4,
      variant: "ON THE EDGE",
      icon: <GiAxeSword />,
      isSinglePlayerMode: true,
      isMultiPlayerMode: true,
      requiredNumOfPlayers: [2, 4],
      description:
        "The other Player selects the question categories for his opponent",
      categoriesNum: 3,
    },
  ],
  maxNumCategories: 3,
  categories: [
    {
      id: Category.BOOKS,
      name: "Books",
      color: "orange",
    },
    {
      id: Category.FILM,
      name: "Film",
      color: "black",
    },
    {
      id: Category.MUSIC,
      name: "Music",
      color: "purple",
    },
    {
      id: Category.MUSICALS_AND_THEATER,
      name: "Musicals & Theater",
      color: "grey",
    },
    {
      id: Category.TELEVISION,
      name: "Television",
      color: "cyan",
    },
    {
      id: Category.VIDEO_GAMES,
      name: "Video Games",
      color: "blueviolet",
    },
    {
      id: Category.BOARD_GAMES,
      name: "Board Games",
      color: "yellow",
    },
    {
      id: Category.SCIENCE_AND_NATURE,
      name: "Science & Nature",
      color: "indigo",
    },
    {
      id: Category.COMPUTERS,
      name: "Computers",
      color: "green",
    },
    {
      id: Category.MATHEMATICS,
      name: "Mathematics",
      color: "royalblue",
    },
    {
      id: Category.MYTHOLOGY,
      name: "Mythology",
      color: "brown",
    },
    {
      id: Category.SPORTS,
      name: "Sports",
      color: "red",
    },
    {
      id: Category.GEOGRAPHY,
      name: "Geography",
      color: "seagreen",
    },
    {
      id: Category.HISTORY,
      name: "History",
      color: "darkyellow",
    },
    {
      id: Category.POLITICS,
      name: "Politics",
      color: "antiquewhite",
    },
    {
      id: Category.ART,
      name: "Art",
      color: "lightcoral",
    },
    {
      id: Category.CELEBRITIES,
      name: "Celebrities",
      color: "pink",
    },
    {
      id: Category.ANIMALS,
      name: "Animals",
      color: "springgreen",
    },
    {
      id: Category.VEHICLES,
      name: "Vehicles",
      color: "rgb(34, 78, 123)",
    },
    {
      id: Category.COMICS,
      name: "Comics",
      color: "rgb(213, 22, 157)",
    },
    {
      id: Category.GADGETS,
      name: "Gadgets",
      color: "rgb(13, 122, 134)",
    },
    {
      id: Category.JAPANESE_ANIME_AND_MANGA,
      name: "Japanese Anime & Manga",
      color: "rgb(22, 178, 16)",
    },
    {
      id: Category.CARTOON_AND_ANIMATIONS,
      name: "Cartoon & Animations",
      color: "rgb(254, 69, 245)",
    },
  ],
};
