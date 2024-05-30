import { useFetch } from "./useFetch";
import { useState, useEffect } from "react";

export function useFetchActivity(id) {
  const { data, isDataLoading, error } = useFetch(`/user/${id}/activity`);
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState(null);
  const [errorHere, setErrorHere] = useState(error);
  useEffect(() => {
    if (!isDataLoading && data) {
      if (!data.data || !data.data.sessions) {
        setErrorHere(true);
        setIsLoading(false);
      } else {
        setActivity(data.data.sessions);
        setIsLoading(false);
      }
    }
  }, [isDataLoading, data, id]);
  return { data: activity, isLoading, error: errorHere };
}
