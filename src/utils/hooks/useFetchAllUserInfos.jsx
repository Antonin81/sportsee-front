import { useFetch } from "./useFetch";
import { useState, useEffect } from "react";

export function useFetchAllUserInfos(id) {
  const { data, isDataLoading, error } = useFetch(`/user/${id}`);
  const [isLoading, setIsLoading] = useState(true);
  const [generalInfos, setGeneralInfos] = useState(null);
  const [objectiveCompletion, setObjectiveCompletion] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [errorHere, setErrorHere] = useState(error);
  useEffect(() => {
    if (!isDataLoading && data) {
      console.log(data.data);
      if (
        !data.data ||
        !data.data.userInfos ||
        (!data.data.todayScore && !data.data.score) ||
        !data.data.keyData
      ) {
        setErrorHere(true);
        setIsLoading(false);
      } else {
        const score = data.data.todayScore
          ? data.data.todayScore
          : data.data.score;
        setGeneralInfos(data.data.userInfos);
        setObjectiveCompletion(score);
        setKeyData(data.data.keyData);
        setIsLoading(false);
      }
    }
  }, [isDataLoading, data, id]);

  return {
    data: {
      userInfos: generalInfos,
      objectiveCompletion: objectiveCompletion,
      keyData: keyData,
    },
    isLoading,
    error: errorHere,
  };
}
