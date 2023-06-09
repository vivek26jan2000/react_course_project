import React from "react";

import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoModel from "./model/todo";

// const items = [
//   new TodoModel("learn react", 23),
//   new TodoModel("learn javascript", 89),
//   new TodoModel("learn typeScript ", 56),
// ];

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  const addTodosHandler = (text: string, id: number) => {
    setTodos((prevState) => {
      return prevState.concat(new TodoModel(text, id));
    });
  };

  const removeTodoHandler = (id: number) => {
    setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== id);
    });
  };

  console.log(todos);
  return (
    <div>
      <Todo
        items={todos}
        onAddTodo={addTodosHandler}
        onRemoveTodo={removeTodoHandler}
      />
    </div>
  );
}

export default App;
