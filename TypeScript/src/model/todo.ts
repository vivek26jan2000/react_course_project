class TodoModel {
  text: string;
  id: number;

  constructor(todoText: string, todoId: number) {
    this.text = todoText;
    this.id = todoId;
  }
}

export default TodoModel;
