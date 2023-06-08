import claassNames from "classnames";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import { useThemeContext } from "./contexts/ThemeContextProvider";
import "./assets/scss/App.scss";

const App = () => {
  const { isDarkMode } = useThemeContext();

  const cssClasses = claassNames({
    "bd-dark text-white": isDarkMode,
  });

  return (
    <div id="App" className={cssClasses}>
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
