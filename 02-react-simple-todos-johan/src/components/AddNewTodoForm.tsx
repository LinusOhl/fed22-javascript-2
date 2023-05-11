import React from "react";

interface IProps {
  newTodoTitle: string;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  onHandleSubmit: (e: React.FormEvent) => void;
}

const AddNewTodoForm: React.FC<IProps> = ({
  onHandleSubmit,
  newTodoTitle,
  setNewTodoTitle,
}) => {
  return (
    <form onSubmit={onHandleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Todo title"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
          required
        />

        <button type="submit" className="btn btn-success">
          Create
        </button>
      </div>
    </form>
  );
};

export default AddNewTodoForm;
