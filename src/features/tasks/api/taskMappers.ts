import type { Task, TaskStatus } from "../types/task.types";
import type { DummyJsonTodo } from "./dummyJsonTask.types";

function mapCompletedToStatus(todo: DummyJsonTodo): TaskStatus {
  if (todo.completed) {
    return "done";
  }

  // DummyJSON only provides completed/not completed.
  // Some incomplete tasks are mapped to "in progress" locally for the dashboard and the rest are pending
  if (todo.id % 3 === 0) {
    return "in progress";
  }

  return "pending";
}

export function mapDummyJsonTodoToTask(todo: DummyJsonTodo): Task {
  return {
    id: String(todo.id),
    title: todo.todo,
    description: `Details for this task: ${todo.todo}`,
    status: mapCompletedToStatus(todo),
    assigneeId: String(todo.userId),
  };
}
