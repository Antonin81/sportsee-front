import { useFetch } from "./useFetch";
import { useState, useEffect } from "react";

/**
 * uses Usefetch to fetch a user's sessions durations with his id. Returns a data object and two booleans : one to say if the data is loading and one to say if it failed
 *
 * @param {number} id
 * @returns {{data: object,isLoading: boolean,error: boolean}}
 */
export function useFetchAverageSessions(id) {
  const { data, isDataLoading, error } = useFetch(
    `/user/${id}/average-sessions`
  );
  const [isLoading, setIsLoading] = useState(true);
  const [averageSessions, setAverageSessions] = useState(null);
  const [errorHere, setErrorHere] = useState(error);
  useEffect(() => {
    if (!isDataLoading && data) {
      if (!data.data || !data.data.sessions) {
        setErrorHere(true);
        setIsLoading(false);
      } else {
        setAverageSessions(data.data.sessions);
        setIsLoading(false);
      }
    }
  }, [isDataLoading, data, id]);
  return { data: averageSessions, isLoading, error: errorHere };
}
