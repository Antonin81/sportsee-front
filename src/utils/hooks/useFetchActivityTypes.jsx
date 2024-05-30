import { useFetch } from "./useFetch";
import { useState, useEffect } from "react";

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
