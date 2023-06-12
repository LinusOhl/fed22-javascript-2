import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import useRandomDogImage from "../hooks/useRandomDogImage";

const RandomDogPage = () => {
  const { data, changeUrl, error, loading, execute, isError } =
    useRandomDogImage();

  return (
    <>
      <h1>A random dog!</h1>

      <div className="mb-3">
        <Button
          variant="primary"
          onClick={() => changeUrl("https://dog.ceo/api/breeds/image/random")}
        >
          Random Dog
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            changeUrl("https://dog.ceo/api/breed/boxer/images/random")
          }
        >
          Random Boxer Dog
        </Button>
        <Button variant="primary" onClick={() => execute()}>
          More Dogs!
        </Button>
      </div>

      {loading && <Spinner animation="border" variant="secondary" />}

      {isError === true && <Alert variant="warning">{error}</Alert>}

      {data && (
        <div>
          <Image src={data.message} fluid />
        </div>
      )}
    </>
  );
};

export default RandomDogPage;
