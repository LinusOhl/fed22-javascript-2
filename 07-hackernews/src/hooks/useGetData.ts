import { useEffect, useState } from "react";
import { DogAPI_RandomImageResponse } from "../types";
import axios from "axios";

const useGetData = (initialUrl: string | null = null) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DogAPI_RandomImageResponse | null>(null);
  const [url, setUrl] = useState<string | null>(initialUrl);

  const getData = async (urlParam: string) => {
    setError("");
    setLoading(true);
    setData(null);

    try {
      const res = await axios.get<DogAPI_RandomImageResponse>(urlParam);
      setData(res.data);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!url) {
      return;
    }

    getData(url);
  }, [url]);

  return {
    data,
    setUrl,
    error,
    loading,
  };
};

export default useGetData;
