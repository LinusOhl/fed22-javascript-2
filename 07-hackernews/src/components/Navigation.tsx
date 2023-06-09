import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import { useThemeContext } from "../hooks/useThemeContext";

const Navigation = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🕵️‍♂️ HackerNews
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={NavLink} end to="/search">
              Search
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/random-dog">
              Random Dog
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/chuck-norris">
              Chuck Norris Joke
            </Nav.Link>

            <Button variant="outline-secondary" onClick={handleToggleTheme}>
              {isDarkMode ? "🌞" : "🌑"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
