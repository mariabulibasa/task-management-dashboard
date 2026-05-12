import { useEffect, useMemo, useState } from "react";
import type { Assignee } from "../../../assignees/types/assignees.types";
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "../../types/task.types";
import { TaskPanelShell } from "./TaskPanelShell";
import { TaskTitleField } from "./TaskTitleField";
import { TaskDescriptionField } from "./TaskDescriptionField";
import { TaskStatusPicker } from "../pickers/TaskStatusPicker";
import { TaskAssigneePicker } from "../pickers/TaskAssigneePicker";

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
    description: "Provide an overview of the task and related details.",
    status: "pending",
    assigneeId: "",
  };
}

function hasTaskInputChanged(
  currentInput: CreateTaskInput,
  initialInput: CreateTaskInput,
): boolean {
  return taskInputFields.some(
    (field) => currentInput[field] !== initialInput[field],
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

  useEffect(() => {
    setFormInput(initialInput);
  }, [initialInput]);

  function updateField<Field extends keyof CreateTaskInput>(
    field: Field,
    value: CreateTaskInput[Field],
  ) {
    setFormInput((currentInput) => ({
      ...currentInput,
      [field]: value,
    }));
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
      <TaskTitleField
        value={formInput.title}
        onChange={(value) => updateField("title", value)}
      />

      <div className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-4 text-sm">
        <TaskAssigneePicker
          assignees={assignees}
          value={formInput.assigneeId}
          onChange={(value) => updateField("assigneeId", value)}
        />

        <TaskStatusPicker
          value={formInput.status}
          onChange={(value) => updateField("status", value)}
        />
      </div>

      <div className="my-10 border-t border-neutral-200" />

      <TaskDescriptionField
        value={formInput.description}
        onChange={(value) => updateField("description", value)}
      />
    </TaskPanelShell>
  );
}
