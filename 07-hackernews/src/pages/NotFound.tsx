import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>404 Not found</h1>
      <p>The page does not exist.</p>

      <Link to="/">
        <Button variant="secondary">&laquo; Homepage</Button>
      </Link>
    </>
  );
};

export default NotFound;
