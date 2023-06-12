import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import useChuckNorrisJoke from "../hooks/useChuckNorrisJoke";

const ChuckNorrisPage = () => {
  const { data, error, loading, execute, isError } = useChuckNorrisJoke();

  return (
    <>
      <h1>A Chuck Norris Joke!</h1>

      <div className="mb-3">
        <Button variant="primary" onClick={() => execute()}>
          More Jokes!
        </Button>
      </div>

      {loading && <Spinner animation="border" variant="secondary" />}

      {isError === true && <Alert variant="warning">{error}</Alert>}

      {data && (
        <div>
          <p className="display-1 text-center">{data.value}</p>
        </div>
      )}
    </>
  );
};

export default ChuckNorrisPage;
