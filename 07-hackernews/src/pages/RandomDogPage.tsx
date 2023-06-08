import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import useGetData from "../hooks/useGetData";

const RandomDogPage = () => {
  const { data, setUrl, error, loading } = useGetData();

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
