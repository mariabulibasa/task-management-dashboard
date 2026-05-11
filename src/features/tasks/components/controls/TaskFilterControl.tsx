import { useMemo, useState } from "react";
import type { TaskStatusFilter } from "../../types/taskControls.types";
import { ListFilter, X } from "lucide-react";
import {
  TASK_STATUS_FILTER_LABELS,
  TASK_STATUS_FILTER_OPTIONS,
} from "../../constants/task.constants";
import type { Assignee } from "../../../assignees/types/assignees.types";
import { findAssigneeById } from "../../../assignees/utils/assignee.utils";
import { SearchInput } from "../common/SearchInput";
import { DropdownMenu } from ".././common/DropdownMenu";
import { DropdownOption } from ".././common/DropdownOption";
import { TaskStatusBadge } from "../status/TaskStatusBadge";

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
      {statusFilter !== "all" && (
        <button
          type="button"
          onClick={handleClearStatusFilter}
          className="inline-flex items-center gap-1 rounded-full p-0.5 transition hover:bg-neutral-100"
        >
          <TaskStatusBadge status={statusFilter} />
          <X size={13} />
        </button>
      )}

      {hasActiveAssigneeFilter && selectedAssignee && (
        <button
          type="button"
          onClick={handleClearAssigneeFilter}
          className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200"
        >
          {selectedAssignee.name}
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

      <DropdownMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        widthClassName="w-72"
        align="right"
      >
        <div>
          <p className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Status
          </p>

          {TASK_STATUS_FILTER_OPTIONS.map((option) => (
            <DropdownOption
              key={option}
              selected={statusFilter === option}
              onClick={() => handleSelectStatusFilter(option)}
            >
              {option === "all" ? (
                TASK_STATUS_FILTER_LABELS[option]
              ) : (
                <TaskStatusBadge status={option} />
              )}
            </DropdownOption>
          ))}
        </div>

        <div className="mt-3 border-t border-neutral-100 pt-3">
          <p className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Assignee
          </p>

          <div className="mb-2">
            <SearchInput
              value={assigneeSearchTerm}
              onValueChange={setAssigneeSearchTerm}
              placeholder="Search assignee..."
              variant="boxed"
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            <DropdownOption
              selected={assigneeFilter === "all"}
              onClick={() => handleSelectAssigneeFilter("all")}
            >
              All assignees
            </DropdownOption>

            {visibleAssignees.map((assignee) => (
              <DropdownOption
                key={assignee.id}
                selected={assigneeFilter === assignee.id}
                onClick={() => handleSelectAssigneeFilter(assignee.id)}
              >
                {assignee.name}
              </DropdownOption>
            ))}
          </div>
        </div>
      </DropdownMenu>
    </div>
  );
}
