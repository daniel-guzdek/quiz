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
};
