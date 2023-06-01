import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types";
import Alert from "react-bootstrap/Alert";
import AddNewTodoForm from "../components/AddNewTodoForm";
import * as TodosAPI from "../services/TodosAPI";

const CreateTodoPage = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Create a new todo in the API
  const addTodo = async (todo: Todo) => {
    try {
      const createdTodo = await TodosAPI.createTodo(todo);

      setTimeout(() => {
        navigate("/todos");
      }, 2000);

      setSuccess(!!createdTodo);
    } catch (err: any) {
      setSuccess(false);
    }
  };

  return (
    <>
      <h1 className="mb-3">Create a new Todo</h1>

      <AddNewTodoForm onAddTodo={addTodo} />

      {success === true && (
        <Alert variant="success" className="mt-3">
          Todo created!
        </Alert>
      )}

      {success === false && (
        <Alert variant="warning" className="mt-3">
          Todo could not be created.
        </Alert>
      )}
    </>
  );
};

export default CreateTodoPage;
