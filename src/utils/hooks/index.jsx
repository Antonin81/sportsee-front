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

export function useFetchInfos(id) {
  const { data, isDataLoading, error } = useFetch(`/user/${id}`);
  const [isLoading, setIsLoading] = useState(true);
  const [generalInfos, setGeneralInfos] = useState(null);
  const [errorHere, setErrorHere] = useState(error);
  useEffect(() => {
    if (!isDataLoading && data) {
      if (!data.data || !data.data.userInfos) {
        setErrorHere(true);
        setIsLoading(false);
      } else {
        setGeneralInfos(data.data.userInfos);
        setIsLoading(false);
      }
    }
  }, [isDataLoading, data, id]);
  return { data: generalInfos, isLoading, error: errorHere };
}

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

export function useFetchObjectiveCompletion(id) {
  const { data, isDataLoading, error } = useFetch(`/user/${id}`);
  const [isLoading, setIsLoading] = useState(true);
  const [objectiveCompletion, setObjectiveCompletion] = useState(null);
  const [errorHere, setErrorHere] = useState(error);
  useEffect(() => {
    if (!isDataLoading && data) {
      if (!data.data || !data.data.score) {
        setErrorHere(true);
        setIsLoading(false);
      } else {
        setObjectiveCompletion(data.data.score);
        setIsLoading(false);
      }
    }
  }, [isDataLoading, data, id]);
  return { data: objectiveCompletion, isLoading, error: errorHere };
}

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

export function useFetchKeyData(id) {
  const { data, isDataLoading, error } = useFetch(`/user/${id}`);
  const [isLoading, setIsLoading] = useState(true);
  const [keyData, setKeyData] = useState(null);
  const [errorHere, setErrorHere] = useState(error);
  useEffect(() => {
    if (!isDataLoading && data) {
      if (!data.data || !data.data.keyData) {
        setErrorHere(true);
        setIsLoading(false);
      } else {
        setKeyData(data.data.keyData);
        setIsLoading(false);
      }
    }
  }, [isDataLoading, data, id]);
  return { data: keyData, isLoading, error: errorHere };
}
