import { Routes, Route } from "react-router-dom";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import TodoPage from "./pages/TodoPage";
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
          <Route path="/todos/:id" element={<TodoPage />} />
          <Route path="/todos/create" element={<CreateTodoPage />} />
          <Route path="/todos/:id/edit" element={<EditTodoPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
