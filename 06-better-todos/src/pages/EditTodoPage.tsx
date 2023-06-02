import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Todo } from "../types";
import * as TodosAPI from "../services/TodosAPI";

const EditTodoPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [todoTitle, setTodoTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = Number(id);

  // Get the todo with :id
  const getTodo = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const data = await TodosAPI.getTodo(id);
      setTodo(data);
      setTodoTitle(data.title);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const updateTodo = async (newTitle: string) => {
    await TodosAPI.updateTodo(todoId, { title: newTitle });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateTodo(todoTitle);

    navigate(`/todos/${todoId}`);
  };

  // Call getTodo()
  useEffect(() => {
    if (typeof todoId !== "number") {
      return;
    }

    getTodo(todoId);
  }, [todoId]);

  // If no todo was found, return
  if (!todo) {
    return <p>No todo was found.</p>;
  }

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>{error}</p>

        <Button variant="primary" onClick={() => getTodo(todoId)}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (loading || !todo) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder={todo.title}
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
          />

          <button
            disabled={!todoTitle.trim()}
            type="submit"
            className="btn btn-success"
          >
            Change
          </button>
        </div>
      </form>

      <Link to={`/todos/${todoId}`}>
        <Button variant="secondary">&laquo; Go back</Button>
      </Link>
    </>
  );
};

export default EditTodoPage;
