import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Todo } from "../types";
import * as TodosAPI from "../services/TodosAPI";

const EditTodoPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = Number(id);

  // Get the todo with :id
  const getTodo = async (id: number) => {
    const data = await TodosAPI.getTodo(id);

    setTodo(data);
  };

  const updateTodo = async (id: number) => {
    const newTodoTitle = "new-update";
    await TodosAPI.updateTodo(id, { title: newTodoTitle });

    navigate("/todos");
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

  return (
    <>
      <div>{todo.title}</div>
      <Button variant="primary" onClick={() => updateTodo(todoId)}>
        Edit Todo
      </Button>
    </>
  );
};

export default EditTodoPage;
