import { useFetch } from "./useFetch";
import { useState, useEffect } from "react";

/**
 * uses Usefetch to fetch a user's activity type related data with his id. Returns a data object and two booleans : one to say if the data is loading and one to say if it failed
 *
 * @param {number} id The user's id
 * @returns {{data: object,isLoading: boolean,error: boolean}}
 */
export function useFetchActivityTypes(id) {
  const { data, isDataLoading, error } = useFetch(`/user/${id}/performance`);
  const [isLoading, setIsLoading] = useState(true);
  const [activityTypes, setActivityTypes] = useState(null);
  const [errorHere, setErrorHere] = useState(error);
  useEffect(() => {
    if (!isDataLoading && data) {
      if (!data.data || !data.data.data || !data.data.kind) {
        setErrorHere(true);
        setIsLoading(false);
      } else {
        setActivityTypes({ data: data.data.data, kind: data.data.kind });
        setIsLoading(false);
      }
    }
  }, [isDataLoading, data, id]);
  return { data: activityTypes, isLoading, error: errorHere };
}
