import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { DogAPI_RandomImageResponse } from "../types";

const RandomDogPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DogAPI_RandomImageResponse | null>(null);
  const [url, setUrl] = useState<string | null>(null);

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

  console.log(data);

  useEffect(() => {
    if (!url) {
      return;
    }

    getData(url);
  }, [url]);

  return (
    <>
      <h1>A random dog!</h1>

      <div className="mb-3">
        <Button
          variant="primary"
          onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}
        >
          Random Dog
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            setUrl("https://dog.ceo/api/breed/boxer/images/random")
          }
        >
          Random Boxer Dog
        </Button>
      </div>

      {error && <p>{error}</p>}

      {loading && <p>Loading...</p>}

      {data && (
        <div>
          <Image src={data.message} fluid />
        </div>
      )}
    </>
  );
};

export default RandomDogPage;
