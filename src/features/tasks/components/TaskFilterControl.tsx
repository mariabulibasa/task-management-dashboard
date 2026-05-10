import { useMemo, useState } from "react";
import type { TaskStatusFilter } from "../types/taskControls.types";
import { ListFilter, Search, X } from "lucide-react";
import {
  TASK_STATUS_FILTER_LABELS,
  TASK_STATUS_FILTER_OPTIONS,
} from "../constants/task.constants";
import type { Assignee } from "../../assignees/types/assignees.types";
import { findAssigneeById } from "../../assignees/utils/assignee.utils";

interface TaskFilterControlProps {
  assignees: Assignee[];
  statusFilter: TaskStatusFilter;
  onStatusFilterChange: (statusFilter: TaskStatusFilter) => void;
  assigneeFilter: string;
  onAssigneeFilterChange: (assigneeFilter: string) => void;
}

export function TaskFilterControl({
  assignees,
  statusFilter,
  onStatusFilterChange,
  assigneeFilter,
  onAssigneeFilterChange,
}: TaskFilterControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [assigneeSearchTerm, setAssigneeSearchTerm] = useState("");
  const selectedAssignee = findAssigneeById(assignees, assigneeFilter);
  const hasActiveStatusFilter = statusFilter !== "all";
  const hasActiveAssigneeFilter = assigneeFilter !== "all";

  const visibleAssignees = useMemo(() => {
    const normalizedSearchTerm = assigneeSearchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return assignees;
    }

    return assignees.filter((assignee) =>
      assignee.name.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [assignees, assigneeSearchTerm]);

  function handleSelectAssigneeFilter(selectedAssigneeId: string) {
    onAssigneeFilterChange(selectedAssigneeId);
    setAssigneeSearchTerm("");
    setIsOpen(false);
  }

  function handleSelectStatusFilter(option: TaskStatusFilter) {
    onStatusFilterChange(option);
    setIsOpen(false);
  }

  function handleClearStatusFilter() {
    onStatusFilterChange("all");
  }

  function handleClearAssigneeFilter() {
    onAssigneeFilterChange("all");
  }

  return (
    <div className="relative flex items-center gap-2">
      {hasActiveStatusFilter && (
        <button
          type="button"
          onClick={handleClearStatusFilter}
          className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200"
        >
          {TASK_STATUS_FILTER_LABELS[statusFilter]}
          <X size={13} />
        </button>
      )}

      {hasActiveAssigneeFilter && (
        <button
          type="button"
          onClick={handleClearAssigneeFilter}
          className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200"
        >
          {selectedAssignee?.name ?? "Assignee"}
          <X size={13} />
        </button>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
        aria-label="Filter tasks"
      >
        <ListFilter size={16} />
      </button>
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close filter dropdown"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />

          <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
            <div>
              <p className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                Status
              </p>

              {TASK_STATUS_FILTER_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectStatusFilter(option)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-neutral-100 ${
                    statusFilter === option
                      ? "bg-neutral-100 font-medium text-neutral-900"
                      : "text-neutral-600"
                  }`}
                >
                  {TASK_STATUS_FILTER_LABELS[option]}
                </button>
              ))}
            </div>

            <div className="mt-3 border-t border-neutral-100 pt-3">
              <p className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                Assignee
              </p>

              <label className="mb-2 flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2">
                <Search size={15} className="text-neutral-400" />

                <input
                  type="text"
                  placeholder="Search assignee..."
                  value={assigneeSearchTerm}
                  onChange={(event) =>
                    setAssigneeSearchTerm(event.target.value)
                  }
                  className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
                />
              </label>

              <div className="max-h-48 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => handleSelectAssigneeFilter("all")}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-neutral-100 ${
                    assigneeFilter === "all"
                      ? "bg-neutral-100 font-medium text-neutral-900"
                      : "text-neutral-600"
                  }`}
                >
                  All assignees
                </button>

                {visibleAssignees.map((assignee) => (
                  <button
                    key={assignee.id}
                    type="button"
                    onClick={() => handleSelectAssigneeFilter(assignee.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-neutral-100 ${
                      assigneeFilter === assignee.id
                        ? "bg-neutral-100 font-medium text-neutral-900"
                        : "text-neutral-600"
                    }`}
                  >
                    {assignee.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
