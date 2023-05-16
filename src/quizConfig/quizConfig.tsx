import { Category } from "../ts/enums/app_enums";
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
      description: "Questions from all avaible subjects",
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
  categories: [
    {
      id: 1,
      name: "Books",
      valueForUrl: Category.BOOKS,
      color: "orange",
    },
    {
      id: 2,
      name: "Film",
      valueForUrl: Category.FILM,
      color: "black",
    },
    {
      id: 3,
      name: "Music",
      valueForUrl: Category.MUSIC,
      color: "purple",
    },
    {
      id: 4,
      name: "Musicals & Theater",
      valueForUrl: Category.MUSICALS_AND_THEATER,
      color: "grey",
    },
    {
      id: 5,
      name: "Television",
      valueForUrl: Category.TELEVISION,
      color: "cyan",
    },
    {
      id: 6,
      name: "Video Games",
      valueForUrl: Category.VIDEO_GAMES,
      color: "blueviolet",
    },
    {
      id: 7,
      name: "Board Games",
      valueForUrl: Category.BOARD_GAMES,
      color: "yellow",
    },
    {
      id: 8,
      name: "Science & Nature",
      valueForUrl: Category.SCIENCE_AND_NATURE,
      color: "indigo",
    },
    {
      id: 9,
      name: "Computers",
      valueForUrl: Category.COMPUTERS,
      color: "green",
    },
    {
      id: 10,
      name: "Mathematics",
      valueForUrl: Category.MATHEMATICS,
      color: "royalblue",
    },
    {
      id: 11,
      name: "Mythology",
      valueForUrl: Category.MYTHOLOGY,
      color: "brown",
    },
    {
      id: 12,
      name: "Sports",
      valueForUrl: Category.SPORTS,
      color: "red",
    },
    {
      id: 13,
      name: "Geography",
      valueForUrl: Category.GEOGRAPHY,
      color: "seagreen",
    },
    {
      id: 14,
      name: "History",
      valueForUrl: Category.HISTORY,
      color: "darkyellow",
    },
    {
      id: 15,
      name: "Politics",
      valueForUrl: Category.POLITICS,
      color: "antiquewhite",
    },
    {
      id: 16,
      name: "Art",
      valueForUrl: Category.ART,
      color: "lightcoral",
    },
    {
      id: 17,
      name: "Celebrities",
      valueForUrl: Category.CELEBRITIES,
      color: "pink",
    },
    {
      id: 18,
      name: "Animals",
      valueForUrl: Category.ANIMALS,
      color: "springgreen",
    },
    {
      id: 19,
      name: "Vehicles",
      valueForUrl: Category.VEHICLES,
      color: "rgb(34, 78, 123)",
    },
    {
      id: 20,
      name: "Comics",
      valueForUrl: Category.COMICS,
      color: "rgb(213, 22, 157)",
    },
    {
      id: 21,
      name: "Gadgets",
      valueForUrl: Category.GADGETS,
      color: "rgb(13, 122, 134)",
    },
    {
      id: 22,
      name: "Japanese Anime & Manga",
      valueForUrl: Category.JAPANESE_ANIME_AND_MANGA,
      color: "rgb(22, 178, 16)",
    },
    {
      id: 23,
      name: "Cartoon & Animations",
      valueForUrl: Category.CARTOON_AND_ANIMATIONS,
      color: "rgb(254, 69, 245)",
    },
  ],
};
