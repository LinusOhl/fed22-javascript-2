import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Welcome to HackerNews!</h1>

      <Link to="/search">
        <Button variant="secondary">To search</Button>
      </Link>
    </>
  );
};

export default HomePage;
