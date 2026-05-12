import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Assignee } from "../../../assignees/types/assignees.types";
import { findAssigneeById } from "../../../assignees/utils/assignee.utils";
import { DropdownMenu } from "../common/DropdownMenu";
import { DropdownOption } from "../common/DropdownOption";
import { SearchInput } from "../common/SearchInput";
import { useFilteredAssignees } from "../../hooks/useFilteredAssignees";

interface TaskAssigneePickerProps {
  assignees: Assignee[];
  value: string;
  onChange: (assigneeId: string) => void;
  showLabel?: boolean;
  dropdownAlign?: "left" | "right";
}

export function TaskAssigneePicker({
  assignees,
  value,
  onChange,
  showLabel = true,
  dropdownAlign = "left",
}: TaskAssigneePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedAssignee = findAssigneeById(assignees, value);

  const {
    assigneeSearchTerm,
    setAssigneeSearchTerm,
    visibleAssignees,
    clearAssigneeSearch,
  } = useFilteredAssignees(assignees);

  function handleCloseDropdown() {
    clearAssigneeSearch();
    setIsOpen(false);
  }

  function handleSelectAssignee(assigneeId: string) {
    handleCloseDropdown();
    onChange(assigneeId);
  }

  return (
    <div className="relative">
      {showLabel && (
        <p className="mb-2 font-medium text-neutral-500">Assignee</p>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="group inline-flex min-h-7 items-center gap-2 rounded-md px-1.5 py-1 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
      >
        {selectedAssignee ? (
          <span>{selectedAssignee.name}</span>
        ) : (
          <span className="text-neutral-400">Empty</span>
        )}

        <ChevronDown
          size={14}
          className="text-neutral-400 opacity-0 transition group-hover:opacity-100"
        />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        onClose={handleCloseDropdown}
        widthClassName="w-72"
        align={dropdownAlign}
      >
        <div className="mb-2">
          <SearchInput
            value={assigneeSearchTerm}
            onValueChange={setAssigneeSearchTerm}
            placeholder="Search assignee..."
            variant="boxed"
          />
        </div>

        <DropdownOption
          selected={value === ""}
          onClick={() => handleSelectAssignee("")}
        >
          No assignee
        </DropdownOption>

        <div className="max-h-56 overflow-y-auto">
          {visibleAssignees.map((assignee) => (
            <DropdownOption
              key={assignee.id}
              selected={value === assignee.id}
              onClick={() => handleSelectAssignee(assignee.id)}
            >
              <span className="block truncate">{assignee.name}</span>
              <span className="block truncate text-xs text-neutral-400">
                {assignee.email}
              </span>
            </DropdownOption>
          ))}
        </div>
      </DropdownMenu>
    </div>
  );
}
