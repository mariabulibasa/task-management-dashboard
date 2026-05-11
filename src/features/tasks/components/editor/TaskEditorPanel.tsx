import { useEffect, useMemo, useState } from "react";
import type { Assignee } from "../../../assignees/types/assignees.types";
import {
  DEFAULT_TASK_DESCRIPTION,
  TASK_STATUS_OPTIONS,
} from "../../constants/task.constants";
import type {
  CreateTaskInput,
  Task,
  TaskStatus,
  UpdateTaskInput,
} from "../../types/task.types";
import { TaskPanelShell } from "./TaskPanelShell";
import { TaskStatusBadge } from "../status/TaskStatusBadge";
import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "../common/DropdownMenu";
import { DropdownOption } from "../common/DropdownOption";
import { SearchInput } from "../common/SearchInput";
import { findAssigneeById } from "../../../assignees/utils/assignee.utils";

interface TaskEditorPanelProps {
  mode: "create" | "edit";
  task?: Task;
  assignees: Assignee[];
  onClose: () => void;
  onCreate: (input: CreateTaskInput) => void;
  onUpdate: (input: UpdateTaskInput) => void;
}

const taskInputFields: Array<keyof CreateTaskInput> = [
  "title",
  "description",
  "status",
  "assigneeId",
];

function getInitialTaskInput(
  mode: "create" | "edit",
  task?: Task,
): CreateTaskInput {
  if (mode === "edit" && task)
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      assigneeId: task.assigneeId,
    };

  return {
    title: "",
    description: DEFAULT_TASK_DESCRIPTION,
    status: "pending",
    assigneeId: "",
  };
}

function hasTaskInputChanged(
  curentInput: CreateTaskInput,
  initialInput: CreateTaskInput,
): boolean {
  return taskInputFields.some(
    (field) => curentInput[field] !== initialInput[field],
  );
}

export function TaskEditorPanel({
  mode,
  task,
  assignees,
  onClose,
  onCreate,
  onUpdate,
}: TaskEditorPanelProps) {
  const initialInput = useMemo(
    () => getInitialTaskInput(mode, task),
    [mode, task],
  );

  const [formInput, setFormInput] = useState(initialInput);
  const [openDropdown, setOpenDropdown] = useState<
    "assignee" | "status" | null
  >(null);
  const [assigneeSearchTerm, setAssigneeSearchTerm] = useState("");

  useEffect(() => {
    setFormInput(initialInput);
    setOpenDropdown(null);
    setAssigneeSearchTerm("");
  }, [initialInput]);

  const selectedAssignee = findAssigneeById(assignees, formInput.assigneeId);

  const visibleAssignees = useMemo(() => {
    const normalizedSearchTerm = assigneeSearchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return assignees;
    }

    return assignees.filter((assignee) =>
      assignee.name.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [assignees, assigneeSearchTerm]);

  function updateField<Field extends keyof CreateTaskInput>(
    field: Field,
    value: CreateTaskInput[Field],
  ) {
    setFormInput((currentInput) => ({
      ...currentInput,
      [field]: value,
    }));
  }

  function handleSelectStatus(status: TaskStatus) {
    updateField("status", status);
    setOpenDropdown(null);
  }

  function handleSelectAssignee(assigneeId: string) {
    updateField("assigneeId", assigneeId);
    setAssigneeSearchTerm("");
    setOpenDropdown(null);
  }

  function getCurrentInput(): CreateTaskInput {
    return {
      ...formInput,
      title: formInput.title.trim(),
    };
  }

  function handleClosePanel() {
    const currentInput = getCurrentInput();

    //only create a new task if it has a title
    if (mode === "create") {
      if (currentInput.title) {
        onCreate(currentInput);
      }
      onClose();
      return;
    }

    if (
      mode === "edit" &&
      task &&
      currentInput.title &&
      hasTaskInputChanged(currentInput, initialInput)
    ) {
      onUpdate({ id: task.id, ...currentInput });
    }

    onClose();
  }

  if (mode === "edit" && !task) return null;

  return (
    <TaskPanelShell
      onClose={handleClosePanel}
      ariaLabel={
        mode === "create" ? "Close new task panel" : "Close task editor"
      }
    >
      <input
        type="text"
        value={formInput.title}
        onChange={(e) => updateField("title", e.target.value)}
        placeholder="Task name"
        className="mt-2 w-full bg-transparent text-3xl font-bold leading-tight tracking-tight text-neutral-900 outline-none placeholder:text-neutral-300"
      />

      <div className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-4 text-sm">
        <div className="relative">
          <p className="mb-2 font-medium text-neutral-500">Assignee</p>

          <button
            type="button"
            onClick={() =>
              setOpenDropdown((currentDropdown) =>
                currentDropdown === "assignee" ? null : "assignee",
              )
            }
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
            isOpen={openDropdown === "assignee"}
            onClose={() => setOpenDropdown(null)}
            widthClassName="w-72"
            align="left"
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
              selected={formInput.assigneeId === ""}
              onClick={() => handleSelectAssignee("")}
            >
              No assignee
            </DropdownOption>
            <div className="max-h-56 overflow-y-auto">
              {visibleAssignees.map((assignee) => (
                <DropdownOption
                  key={assignee.id}
                  selected={formInput.assigneeId === assignee.id}
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

        <div className="relative">
          <p className="mb-2 font-medium text-neutral-500">Status</p>

          <button
            type="button"
            onClick={() =>
              setOpenDropdown((currentDropdown) =>
                currentDropdown === "status" ? null : "status",
              )
            }
            className="group inline-flex min-h-7 items-center gap-2 rounded-md px-1.5 py-1 transition hover:bg-neutral-100"
          >
            <TaskStatusBadge status={formInput.status} />

            <ChevronDown
              size={14}
              className="text-neutral-400 opacity-0 transition group-hover:opacity-100"
            />
          </button>

          <DropdownMenu
            isOpen={openDropdown === "status"}
            onClose={() => setOpenDropdown(null)}
            widthClassName="w-56"
            align="left"
          >
            {TASK_STATUS_OPTIONS.map((statusOption) => (
              <DropdownOption
                key={statusOption}
                selected={formInput.status === statusOption}
                onClick={() => handleSelectStatus(statusOption)}
              >
                <TaskStatusBadge status={statusOption} />
              </DropdownOption>
            ))}
          </DropdownMenu>
        </div>
      </div>
      <div className="my-10 border-t border-neutral-200" />

      <section>
        <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Task Description
        </h3>

        <textarea
          value={formInput.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Add details about this task..."
          className="mt-5 min-h-48 w-full resize-none bg-transparent text-base leading-7 text-neutral-700 outline-none placeholder:text-neutral-300"
        />
      </section>

      {mode === "create" && !formInput.title.trim() && (
        <p className="mt-8 text-sm text-neutral-400">
          Add a task name before closing the panel to create it.
        </p>
      )}
    </TaskPanelShell>
  );
}
