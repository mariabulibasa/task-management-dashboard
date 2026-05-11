import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types/task.types";
import { createTask, updateTask } from "../api/taskApi";

const TASKS_QUERY_KEY = ["tasks"];

export function useTaskMutations() {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (currentTasks) => {
        if (!currentTasks) return [createdTask];
        return [createdTask, ...currentTasks];
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (currentTasks) => {
        if (!currentTasks) return [updatedTask];
        return currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        );
      });
    },
  });

  return { createTaskMutation, updateTaskMutation };
}
