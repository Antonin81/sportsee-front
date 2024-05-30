import { useEffect, useState } from "react";

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
