import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types/task.types";
import { createTask, deleteTask, updateTask } from "../api/taskApi";
import { saveStoredTasks } from "../storage/taskStorage";

const TASKS_QUERY_KEY = ["tasks"];

export function useTaskMutations() {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (currentTasks) => {
        const updatedTasks = currentTasks
          ? [createdTask, ...currentTasks]
          : [createdTask];

        saveStoredTasks(updatedTasks);
        return updatedTasks;
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (currentTasks) => {
        const updatedTasks = currentTasks
          ? currentTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            )
          : [updatedTask];

        saveStoredTasks(updatedTasks);
        return updatedTasks;
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (deletedTaskId) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (currentTasks) => {
        const updatedTasks = currentTasks
          ? currentTasks.filter((task) => task.id !== deletedTaskId)
          : [];

        saveStoredTasks(updatedTasks);
        return updatedTasks;
      });
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
}
