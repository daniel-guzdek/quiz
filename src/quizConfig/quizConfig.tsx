import { Category } from "../ts/enums/app_enums";

export const quizConfig = {
  quizModes: [
    {
      id: 1,
      variant: "MY THING",
      icon: "a",
      isSinglePlayerMode: true,
      isMultiPlayerMode: false,
      description: "Questions from choosen subject",
    },
    {
      id: 2,
      variant: "MY THING VS. MY THING",
      icon: "b",
      isSinglePlayerMode: false,
      isMultiPlayerMode: true,
      description: "Questions from choosen subject for each Player",
    },
    {
      id: 3,
      variant: "OMNIBUS",
      icon: "c",
      isSinglePlayerMode: true,
      isMultiPlayerMode: true,
      description: "Questions from all avaible subjects",
    },
    {
      id: 4,
      variant: "ON THE EDGE",
      icon: "d",
      isSinglePlayerMode: false,
      isMultiPlayerMode: true,
      description: "On the Edge description",
    },
    {
      id: 5,
      variant: "TAKE IT OR LEAVE IT",
      icon: "e",
      isSinglePlayerMode: false,
      isMultiPlayerMode: true,
      description: "Take it or leave it description",
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
  ],
};
