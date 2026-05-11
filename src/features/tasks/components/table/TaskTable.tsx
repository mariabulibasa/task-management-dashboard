import type { Assignee } from "../../../assignees/types/assignees.types";
import type { Task, UpdateTaskInput } from "../../types/task.types";
import type {
  TaskSortOption,
  TaskStatusFilter,
} from "../../types/taskControls.types";
import { TaskTableRow } from "./TaskTableRow";
import { TaskTableToolbar } from "./TaskTableToolbar";

interface TaskTableProps {
  tasks: Task[];
  assignees: Assignee[];
  onNewTask: () => void;
  onOpenTaskDetails: (taskId: string) => void;
  sortOption: TaskSortOption;
  onSortChange: (sortOption: TaskSortOption) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  statusFilter: TaskStatusFilter;
  onStatusFilterChange: (statusFilter: TaskStatusFilter) => void;
  assigneeFilter: string;
  onAssigneeFilterChange: (assigneeFilter: string) => void;
  onUpdateTask: (input: UpdateTaskInput) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskTable({
  tasks,
  assignees,
  onNewTask,
  onOpenTaskDetails,
  sortOption,
  onSortChange,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  assigneeFilter,
  onAssigneeFilterChange,
  onUpdateTask,
  onDeleteTask,
}: TaskTableProps) {
  return (
    <section className="relative rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-5 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="shrink-0">
            <h2 className="text-lg font-semibold text-neutral-900">Tasks</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Hover over a row to open details or access more actions.
            </p>
          </div>

          <TaskTableToolbar
            assignees={assignees}
            onNewTask={onNewTask}
            sortOption={sortOption}
            onSortChange={onSortChange}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
            assigneeFilter={assigneeFilter}
            onAssigneeFilterChange={onAssigneeFilterChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[96px_1.5fr_160px_220px] border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
        <div />
        <div>Task name</div>
        <div>Status</div>
        <div>Assignee</div>
      </div>
      <div className="divide-y divide-neutral-100">
        {tasks.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="mt-1 text-sm text-neutral-500">
              There are no tasks to display.
            </p>
          </div>
        ) : (
          tasks.map((task) => {
            return (
              <TaskTableRow
                key={task.id}
                task={task}
                assignees={assignees}
                onOpenTaskDetails={onOpenTaskDetails}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
