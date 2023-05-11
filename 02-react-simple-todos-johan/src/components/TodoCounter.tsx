import React from "react";
import { TodoList } from "../types";

interface IProps {
  total: number;
  finished: number;
}

const TodoCounter: React.FC<IProps> = ({ finished, total }) => {
  return (
    <p>
      {finished} / {total} todos completed
    </p>
  );
};

export default TodoCounter;
