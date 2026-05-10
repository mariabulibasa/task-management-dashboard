import { useMemo, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useAssignees } from "../../assignees/hooks/useAssignees";
import { TaskTable } from "./TaskTable";
import { TaskDetailsPanel } from "./TaskDetailsPanel";
import { findAssigneeById } from "../../assignees/utils/assignee.utils";
import type { TaskSortOption } from "../types/taskControls.types";
import { sortTasks } from "../utils/sortTasks";

export function TaskDashboard() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<TaskSortOption>("default");

  const taskQuery = useTasks();
  const assigneeQuery = useAssignees();

  const tasks = taskQuery.data?.slice(5, 20) ?? [];
  const assignees = assigneeQuery.data ?? [];

  const visibleTasks = useMemo(() => {
    return sortTasks(tasks, assignees, sortOption);
  }, [tasks, assignees, sortOption]);

  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id === selectedTaskId);
  }, [tasks, selectedTaskId]);

  const selectedAssignee = useMemo(() => {
    if (!selectedTask) return undefined;
    return findAssigneeById(assignees, selectedTask.assigneeId);
  }, [selectedTask, assignees]);

  if (taskQuery.isLoading || assigneeQuery.isLoading) {
    return (
      <main className="min-h-screen bg-neutral-100 p-6">
        <p className="text-neutral-700">Loading dashboard data...</p>
      </main>
    );
  }

  if (taskQuery.isError || assigneeQuery.isError) {
    return (
      <main className="min-h-screen bg-neutral-100 p-6">
        <p className="text-neutral-700">Failed to load dashboard data.</p>
      </main>
    );
  }

  function handleOpenTaskDetailsPanel(taskId: string) {
    setSelectedTaskId(taskId);
  }

  function handleCloseTaskDetailsPanel() {
    setSelectedTaskId(null);
  }

  function handleNewTask() {
    //Implement functionality for adding new task
  }

  return (
    <main className="min-h-screen bg-neutral-100 p-6 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Task Management Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Manage, track and inspect tasks.
          </p>
        </header>

        <div className="mt-6">
          <TaskTable
            tasks={visibleTasks}
            assignees={assignees}
            onNewTask={handleNewTask}
            onOpenTaskDetails={handleOpenTaskDetailsPanel}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>
      </div>

      <TaskDetailsPanel
        task={selectedTask}
        assignee={selectedAssignee}
        onClose={handleCloseTaskDetailsPanel}
      />
    </main>
  );
}
