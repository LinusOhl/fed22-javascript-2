import { useEffect, useState } from "react";
import { Todo, Todos } from "./types";
import TodoList from "./components/TodoList";
import TodoCounter from "./components/TodoCounter";
import AddNewTodoForm from "./components/AddNewTodoForm";
import "./assets/scss/App.scss";

function App() {
  const [todos, setTodos] = useState<Todos>([
    { title: "Make coffee", completed: true },
    { title: "Drink coffee", completed: false },
    { title: "Drink MOAR coffee", completed: false },
    { title: "Drink ALL THE coffee", completed: false },
  ]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (todoToDelete: Todo) => {
    // set a new list of todos where the clicked todo is excluded
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  const toggleTodo = (todo: Todo) => {
    todo.completed = !todo.completed;
    setTodos([...todos]);
  };

  const unfinishedTodos = todos.filter((todo) => !todo.completed);
  const finishedTodos = todos.filter((todo) => todo.completed);

  useEffect(() => {
    document.title = `${finishedTodos.length} / ${todos.length} todos completed`;
  }, [finishedTodos.length, todos.length]);

  return (
    <div className="container">
      <h1 className="mb-3">React Simple Todos</h1>

      <AddNewTodoForm onAddTodo={addTodo} />

      {todos.length > 0 && (
        <>
          <TodoList
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            todos={unfinishedTodos}
          />

          <TodoList
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            todos={finishedTodos}
          />

          <TodoCounter finished={finishedTodos.length} total={todos.length} />
        </>
      )}

      {todos.length === 0 && <p>No more todos 🎆</p>}
    </div>
  );
}

export default App;
