import { useState } from "react";
import "./App.css";

type Todo = {
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { title: "Learn something useful", completed: true },
    { title: "Buy a car", completed: false },
    { title: "Go to sleep", completed: false },
  ]);

  // input state
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = { title: newTodoTitle, completed: false };

    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
  };

  const handleToggleTodo = (todoToToggle: Todo) => {
    todoToToggle.completed = !todoToToggle.completed;

    setTodos([...todos]);
  };

  const handleDeleteTodo = (todoToDelete: Todo) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  return (
    <div className="App">
      <div className="container mt-3 w-50">
        <h1>Todos</h1>
        <p>
          {todos.filter((todo) => todo.completed).length} / {todos.length} todos
          completed
        </p>

        <form className="mb-3" onSubmit={handleFormSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter todo title..."
              onChange={(e) => setNewTodoTitle(e.target.value)}
              value={newTodoTitle}
              required
            />
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>

        <h2>Uncompleted todos</h2>

        {todos.filter((todo) => !todo.completed).length <= 0 && (
          <p>No uncompleted todos exist...</p>
        )}

        {todos.length > 0 && (
          <ul className="list-group mb-3">
            {todos
              .filter((todo) => !todo.completed)
              .map((todo, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  <span onClick={() => handleToggleTodo(todo)}>
                    {todo.title}
                  </span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTodo(todo)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        )}

        <h2>Completed todos</h2>

        {todos.filter((todo) => todo.completed).length <= 0 && (
          <p>No completed todos exist...</p>
        )}

        {todos.length > 0 && (
          <ul className="list-group">
            {todos
              .filter((todo) => todo.completed)
              .map((todo, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center text-decoration-line-through"
                  key={index}
                >
                  <span onClick={() => handleToggleTodo(todo)}>
                    {todo.title}
                  </span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTodo(todo)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
