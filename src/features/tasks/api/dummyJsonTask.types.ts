export interface DummyJsonTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface DummyJsonTodosResponse {
  //array of tasks
  todos: DummyJsonTodo[];
  total: number;
  skip: number;
  limit: number;
}
