import React, { useState } from "react";
import { Todo } from "../types";

interface IProps {
  onAddTodo: (todo: Todo) => void;
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    // stop form from submitting
    e.preventDefault();

    // create a new todo and set a new todos state
    const newTodo: Todo = {
      title: newTodoTitle,
      completed: false,
    };

    onAddTodo(newTodo);

    // clear newTodoTitle state
    setNewTodoTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Todo title"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
          required
        />

        <button
          type="submit"
          className="btn btn-success"
          disabled={!newTodoTitle.trim()}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default AddNewTodoForm;
