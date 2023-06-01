import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import TodosPage from "./pages/TodosPage";
import "./assets/scss/App.scss";

const App = () => {
  return (
    <div id="App">
      <Navigation />

      <div className="container py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
