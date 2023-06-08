import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContextProvider";

const HomePage = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleToggleTheme = () => {
    if (toggleTheme) {
      toggleTheme();
    }
  };

  return (
    <>
      <h1>Welcome to HackerNews!</h1>

      <p>Your theme is: {isDarkMode ? "dark" : "light"}</p>

      <Button variant="warning" onClick={handleToggleTheme}>
        Switch theme
      </Button>

      <Link to="/search">
        <Button variant="secondary">Search &raquo;</Button>
      </Link>
    </>
  );
};

export default HomePage;
