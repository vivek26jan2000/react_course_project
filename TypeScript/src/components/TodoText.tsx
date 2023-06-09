import classes from "./style.module.css";
const TodoText: React.FC<{
  text: string;
  id: number;
  onRemoveTodo: (id: number) => void;
}> = (props) => {
  return (
    <ul className={classes.list}>
      <li key={props.id}> {props.text}</li>
      <button onClick={() => props.onRemoveTodo(props.id)}>-remove</button>
    </ul>
  );
};

export default TodoText;
