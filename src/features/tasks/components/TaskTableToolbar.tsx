import { Plus } from "lucide-react";
import type {
  TaskSortOption,
  TaskStatusFilter,
} from "../types/taskControls.types";
import { TaskSortControl } from "./TaskSortControl";
import { TaskFilterControl } from "./TaskFilterControl";
import type { Assignee } from "../../assignees/types/assignees.types";
import { SearchInput } from "./SearchInput";

interface TaskTableToolbarProps {
  assignees: Assignee[];
  onNewTask: () => void;
  sortOption: TaskSortOption;
  onSortChange: (sortOption: TaskSortOption) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  statusFilter: TaskStatusFilter;
  onStatusFilterChange: (statusFilter: TaskStatusFilter) => void;
  assigneeFilter: string;
  onAssigneeFilterChange: (assigneeFilter: string) => void;
}

export function TaskTableToolbar({
  assignees,
  onNewTask,
  sortOption,
  onSortChange,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  assigneeFilter,
  onAssigneeFilterChange,
}: TaskTableToolbarProps) {
  return (
    <div className="ml-auto flex items-center gap-3">
      <SearchInput
        value={searchTerm}
        onValueChange={onSearchChange}
        placeholder="Search tasks..."
      />

      <TaskFilterControl
        assignees={assignees}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        assigneeFilter={assigneeFilter}
        onAssigneeFilterChange={onAssigneeFilterChange}
      />

      <TaskSortControl sortOption={sortOption} onSortChange={onSortChange} />

      <button
        type="button"
        onClick={onNewTask}
        className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700"
      >
        <Plus size={15} />
        New
      </button>
    </div>
  );
}
