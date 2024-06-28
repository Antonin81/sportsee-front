import { useFetch } from "./useFetch";
import { useState, useEffect } from "react";

/**
 * uses Usefetch to fetch a user's activity related data with his id. Returns a data object and two booleans : one to say if the data is loading and one to say if it failed
 *
 * @param {number} id The id of the user
 * @returns {{data: object,isLoading: boolean,error: boolean}}
 */
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
