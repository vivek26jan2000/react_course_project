import { useRef } from "react";
import TodoModel from "../model/todo";
import classes from "./style.module.css";
import TodoText from "./TodoText";

const Todo: React.FC<{
  items: TodoModel[];
  onAddTodo: (text: string, id: number) => void;
  onRemoveTodo: (id: number) => void;
}> = (props) => {
  const inputTextTodoRef = useRef<HTMLInputElement>(null);
  const inputIdTodoRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enterText = inputTextTodoRef.current!.value;
    const enterId = +inputIdTodoRef.current!.value;

    if (enterText.trim().length === 0 && !enterId) {
      return;
    }
    console.log(enterText, enterId);
    props.onAddTodo(enterText, enterId);
  };
  return (
    <div className={classes.container}>
      <form onSubmit={todoSubmitHandler} className={classes.form}>
        <label htmlFor="text">Todos Text</label>
        <input id="text" type="text" ref={inputTextTodoRef} />
        <label htmlFor="number">Todos Id</label>
        <input id="number" type="text" ref={inputIdTodoRef} />
        <button type="submit">+Add</button>
      </form>
      <div>
        {props.items.map((todo) => (
          <TodoText
            key={todo.id}
            text={todo.text}
            id={todo.id}
            onRemoveTodo={props.onRemoveTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
