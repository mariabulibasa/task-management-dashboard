import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TASK_STATUS_OPTIONS } from "../../constants/task.constants";
import type { TaskStatus } from "../../types/task.types";
import { DropdownMenu } from "../common/DropdownMenu";
import { DropdownOption } from "../common/DropdownOption";
import { TaskStatusBadge } from "../status/TaskStatusBadge";

interface TaskStatusPickerProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  showLabel?: boolean;
}

export function TaskStatusPicker({
  value,
  onChange,
  showLabel = true,
}: TaskStatusPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectStatus(status: TaskStatus) {
    onChange(status);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {showLabel && <p className="mb-2 font-medium text-neutral-500">Status</p>}

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="group inline-flex min-h-7 items-center gap-2 rounded-md px-1.5 py-1 transition hover:bg-neutral-100"
      >
        <TaskStatusBadge status={value} />

        <ChevronDown
          size={14}
          className="text-neutral-400 opacity-0 transition group-hover:opacity-100"
        />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        widthClassName="w-56"
        align="left"
      >
        {TASK_STATUS_OPTIONS.map((statusOption) => (
          <DropdownOption
            key={statusOption}
            selected={value === statusOption}
            onClick={() => handleSelectStatus(statusOption)}
          >
            <TaskStatusBadge status={statusOption} />
          </DropdownOption>
        ))}
      </DropdownMenu>
    </div>
  );
}
