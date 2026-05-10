export type TaskStatus = "pending" | "in progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
}

export interface UpdateTaskInput extends CreateTaskInput {
  id: string;
}
