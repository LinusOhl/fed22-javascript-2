import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContextProvider";

const HomePage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <h1>Welcome to HackerNews!</h1>

      <p>Your theme is: {isDarkMode ? "dark" : "light"}</p>

      <Link to="/search">
        <Button variant="secondary">Search &raquo;</Button>
      </Link>
    </>
  );
};

export default HomePage;
