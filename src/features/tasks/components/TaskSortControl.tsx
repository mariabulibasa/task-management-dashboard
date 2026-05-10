import { useState } from "react";
import type { TaskSortOption } from "../types/taskControls.types";
import { ArrowUpDown, X } from "lucide-react";
import {
  TASK_SORT_LABELS,
  TASK_SORT_OPTIONS,
} from "../constants/task.constants";

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
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
        aria-label="Sort tasks"
      >
        <ArrowUpDown size={16} />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close sort dropdown"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />

          <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
            {TASK_SORT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectSort(option)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-neutral-100 ${
                  sortOption === option
                    ? "bg-neutral-100 font-medium text-neutral-900"
                    : "text-neutral-600"
                }`}
              >
                {TASK_SORT_LABELS[option]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
