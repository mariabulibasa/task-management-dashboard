import { useMemo, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useAssignees } from "../../../assignees/hooks/useAssignees";
import { TaskTable } from "../table/TaskTable";
import type {
  TaskEditorMode,
  TaskSortOption,
  TaskStatusFilter,
} from "../../types/taskControls.types";
import { sortTasks } from "../../utils/sortTasks";
import { filterTasks } from "../../utils/filterTasks";
import type { CreateTaskInput, UpdateTaskInput } from "../../types/task.types";
import { TaskEditorPanel } from "../editor/TaskEditorPanel";
import { useTaskMutations } from "../../hooks/useTaskMutations";

export function TaskDashboard() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<TaskSortOption>("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [editorMode, setEditorMode] = useState<TaskEditorMode>(null);

  const { createTaskMutation, updateTaskMutation, deleteTaskMutation } =
    useTaskMutations();

  const taskQuery = useTasks();
  const assigneeQuery = useAssignees();

  const tasks = taskQuery.data ?? [];
  const assignees = assigneeQuery.data ?? [];

  const visibleTasks = useMemo(() => {
    const filteredTasks = filterTasks({
      tasks,
      searchTerm,
      statusFilter,
      assigneeFilter,
    });
    return sortTasks(filteredTasks, assignees, sortOption);
  }, [tasks, searchTerm, statusFilter, assigneeFilter, assignees, sortOption]);

  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id === selectedTaskId);
  }, [tasks, selectedTaskId]);

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

  function handleOpenEditor(taskId: string) {
    setSelectedTaskId(taskId);
    setEditorMode("edit");
  }

  function handleCloseEditor() {
    setEditorMode(null);
    setSelectedTaskId(null);
  }

  function handleNewTask() {
    setSelectedTaskId(null);
    setEditorMode("create");
  }

  function handleCreateTask(input: CreateTaskInput) {
    createTaskMutation.mutate(input);
  }

  function handleUpdateTask(input: UpdateTaskInput) {
    updateTaskMutation.mutate(input);
  }

  function handleDeleteTask(taskId: string) {
    deleteTaskMutation.mutate(taskId);
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
            onOpenTaskDetails={handleOpenEditor}
            sortOption={sortOption}
            onSortChange={setSortOption}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            assigneeFilter={assigneeFilter}
            onAssigneeFilterChange={setAssigneeFilter}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      {editorMode && (
        <TaskEditorPanel
          mode={editorMode}
          task={editorMode === "edit" ? selectedTask : undefined}
          assignees={assignees}
          onClose={handleCloseEditor}
          onCreate={handleCreateTask}
          onUpdate={handleUpdateTask}
        ></TaskEditorPanel>
      )}
    </main>
  );
}
