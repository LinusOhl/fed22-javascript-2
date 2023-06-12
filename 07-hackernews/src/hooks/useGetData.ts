import { useEffect, useState } from "react";
import axios from "axios";

const useGetData = <T = any>(initialUrl: string | null = null) => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [url, setUrl] = useState<string | null>(initialUrl);

  const changeUrl = (_url: string) => {
    try {
      const url = new URL(_url);
      setUrl(url.toString());
    } catch (err: any) {
      setError(err.message);
      setIsError(true);
    }
  };

  const execute = () => {
    if (!url) {
      return;
    }

    getData(url);
  };

  const getData = async (urlParam: string) => {
    setError("");
    setIsError(false);
    setLoading(true);
    setData(null);

    try {
      const res = await axios.get<T>(urlParam);
      setData(res.data);
    } catch (err: any) {
      setError(err.message);
      setIsError(true);
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
    changeUrl,
    error,
    loading,
    execute,
    isError,
  };
};

export default useGetData;
