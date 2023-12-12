import { useState, useEffect } from "react";
import { Difficulty } from "../ts/enums/appEnums";
import { QuestionsState } from "../ts/types/appTypes";

export const useFetch = ({ url }: any) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async (
    amount: number,
    category: string,
    difficulty: Difficulty
  ): Promise<QuestionsState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    setResponse(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchQuestions(10, "Sport", Difficulty.EASY);
  }, [url]);

  return { response, error, loading };
};
