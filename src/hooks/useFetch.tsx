import { useState, SetStateAction } from "react";
import { User } from "../ts/types/appTypes";
import axios from "axios";
import { quizConfig } from "../quizConfig/quizConfig";

export const useFetch = (users: User[], actualUserId: number | null) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<SetStateAction<string | null>>(null);
  const [loading, setLoading] = useState(false);

  const user = actualUserId ? users[actualUserId - 1] : null;
  const catIds = user?.quizData.selectedCatg.map((cat) => cat.id);
  const amount = quizConfig.questions.amount;

  const urls = catIds?.length
    ? catIds?.map(
        (id) => `https://opentdb.com/api.php?amount=${amount}&category=${id}`
      )
    : [];

  const loadData = async () => {
    setLoading(true);

    Promise.all(urls.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setError(null);
        const results = res.map((el) => el.data.results);
        setQuestions(results);
        return results;
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => setError(err));

    return questions;
  };

  return { questions, error, loading, loadData };
};
