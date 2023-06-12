import classNames from "classnames";
import { Routes, Route } from "react-router-dom";
import ChuckNorrisPage from "./pages/ChuckNorrisPage";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import { useThemeContext } from "./hooks/useThemeContext";
import RandomDogPage from "./pages/RandomDogPage";
import "./assets/scss/App.scss";

const App = () => {
  const { isDarkMode } = useThemeContext();

  const cssClasses = classNames({
    "bg-dark text-white": isDarkMode,
  });

  return (
    <div id="App" className={cssClasses}>
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chuck-norris" element={<ChuckNorrisPage />} />
          <Route path="/random-dog" element={<RandomDogPage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
