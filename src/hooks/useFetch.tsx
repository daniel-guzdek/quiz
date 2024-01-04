import { useState, SetStateAction } from "react";
import { User } from "../ts/types/appTypes";
import axios from "axios";
import { quizConfig } from "../quizConfig/quizConfig";

export const useFetch = (
  users: User[],
  actualUserId: number | null,
  quizMode: string
) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<SetStateAction<string | null>>(null);
  const [loading, setLoading] = useState(false);

  const user = actualUserId ? users[actualUserId - 1] : null;
  const catIds = user?.quizData.selectedCatg.map((cat) => cat.id);
  const amount = quizConfig.questions.amount;
  const allCatgAmount = 3 * amount;

  const urls =
    quizMode !== "OMNIBUS" && catIds?.length
      ? catIds?.map(
          (id) => `https://opentdb.com/api.php?amount=${amount}&category=${id}`
        )
      : [`https://opentdb.com/api.php?amount=${allCatgAmount}`];

  const loadData = async () => {
    setLoading(true);

    Promise.all(urls.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setError(null);
        const results = res.map((el) => el.data.results);
        setQuestions(results);
        return results;
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });

    return questions;
  };

  // const mockedUrls =
  //   quizMode !== "OMNIBUS" && catIds?.length
  //     ? catIds?.map(
  //         (id) => `/data/${id}&_limit=${amount}`
  //       )
  //     : [`https://opentdb.com/api.php?amount=${allCatgAmount}`];

  // const loadMockedData = async () => {
  //   setLoading(true);

  //   Promise.all(urls.map((endpoint) => axios.get(endpoint)))
  //     .then((res) => {
  //       setError(null);
  //       const results = res.map((el) => el.data.results);
  //       setQuestions(results);
  //       return results;
  //     })
  //     .catch((err) => setError(err))
  //     .finally(() => {
  //       setLoading(false);
  //     });

  //   return questions;
  // };

  return {
    questions,
    error,
    loading,
    loadData,
  };
};
