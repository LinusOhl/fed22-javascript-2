import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Todo } from "../types";
import * as TodosAPI from "../services/TodosAPI";

const TodoPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = Number(id);

  // Get todo from API
  const getTodo = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const data = await TodosAPI.getTodo(id);
      setTodo(data);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  // Delete a todo in the api
  const deleteTodo = async (todo: Todo) => {
    if (!todo.id) {
      return;
    }

    // Delete todo from the api
    await TodosAPI.deleteTodo(todo.id);

    navigate("/todos", {
      replace: true,
      state: { message: `"${todo.title}" was successfully deleted.` },
    });
  };

  // Toggle the completed status of a todo in the api
  const toggleTodo = async (todo: Todo) => {
    if (!todo.id) {
      return;
    }

    // Update a todo in the api
    const updatedTodo = await TodosAPI.updateTodo(todo.id, {
      completed: !todo.completed,
    });

    // Get all the todos from the api
    setTodo(updatedTodo);
  };

  useEffect(() => {
    if (typeof todoId !== "number") {
      return;
    }

    getTodo(todoId);
  }, [todoId]);

  if (loading || !todo) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong.</h1>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <>
      <h1>{todo.title}</h1>

      <p>
        <strong>Status:</strong>{" "}
        {todo.completed ? "Completed" : "Not completed"}
      </p>

      <div className="buttons mb-3">
        <Button variant="primary" onClick={() => toggleTodo(todo)}>
          Toggle
        </Button>
        <Button variant="secondary" className="mx-1">
          Edit
        </Button>
        <Button variant="danger" onClick={() => deleteTodo(todo)}>
          Delete
        </Button>
      </div>

      <Link to={"/todos"}>
        <Button variant="secondary">&laquo; All todos</Button>
      </Link>
    </>
  );
};

export default TodoPage;
