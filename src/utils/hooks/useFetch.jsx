import { useEffect, useState } from "react";

/**
 * fetches data on a given url and returns a data object and two booleans : one to say if the data is loading and one to say if it failed
 *
 * @param {string} url
 * @returns {{data: object,isDataLoading: boolean,error: boolean}}
 */
export function useFetch(url) {
  const [data, setData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch(`http://localhost:3000${url}`);
        setData(await response.json());
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setIsDataLoading(false);
      }
    };
    if (!url) return;
    setIsDataLoading(true);
    fetchData();
  }, [url]);

  return { data, isDataLoading, error };
}
