import { Search, ListFilter, Plus } from "lucide-react";
import type { TaskSortOption } from "../types/taskControls.types";
import { TaskSortControl } from "./TaskSortControl";

interface TaskTableToolbarProps {
  onNewTask: () => void;
  sortOption: TaskSortOption;
  onSortChange: (sortOption: TaskSortOption) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

export function TaskTableToolbar({
  onNewTask,
  sortOption,
  onSortChange,
  searchTerm,
  onSearchChange,
}: TaskTableToolbarProps) {
  return (
    <div className="ml-auto flex items-center gap-3">
      <label className="flex w-64 items-center gap-2 border-b border-neutral-200 pb-1 transition focus-within:border-neutral-400">
        <Search size={16} className="text-neutral-400" />

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
        />
      </label>

      <button
        type="button"
        disabled
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed"
        aria-label="Filter tasks"
      >
        <ListFilter size={16} />
      </button>

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
