import { useState } from "react";
import type { TaskSortOption } from "../../types/taskControls.types";
import { ArrowUpDown, X } from "lucide-react";
import {
  TASK_SORT_LABELS,
  TASK_SORT_OPTIONS,
} from "../../constants/task.constants";
import { DropdownOption } from "../common/DropdownOption";
import { DropdownMenu } from "../common/DropdownMenu";

interface TaskSortControlProps {
  sortOption: TaskSortOption;
  onSortChange: (sortOption: TaskSortOption) => void;
}

export function TaskSortControl({
  sortOption,
  onSortChange,
}: TaskSortControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveSort = sortOption !== "default";

  function handleSelectSort(option: TaskSortOption) {
    onSortChange(option);
    setIsOpen(false);
  }

  function handleClearSort() {
    onSortChange("default");
  }

  return (
    <div className="relative flex items-center gap-2">
      {hasActiveSort && (
        <button
          type="button"
          onClick={handleClearSort}
          className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200"
        >
          {TASK_SORT_LABELS[sortOption]}
          <X size={13} />
        </button>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className={`rounded-md p-1.5 transition ${
          isOpen
            ? "bg-neutral-100 text-neutral-900"
            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
        }`}
        aria-label="Sort tasks"
      >
        <ArrowUpDown size={16} />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        widthClassName="w-56"
        align="right"
      >
        {TASK_SORT_OPTIONS.map((option) => (
          <DropdownOption
            key={option}
            selected={sortOption === option}
            onClick={() => handleSelectSort(option)}
          >
            {TASK_SORT_LABELS[option]}
          </DropdownOption>
        ))}
      </DropdownMenu>
    </div>
  );
}
