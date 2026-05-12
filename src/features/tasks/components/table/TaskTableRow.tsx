import type { Task, UpdateTaskInput } from "../../types/task.types";
import { EditableTaskTitleCell } from "./EditableTaskTitleCell";
import type { Assignee } from "../../../assignees/types/assignees.types";
import { TaskAssigneePicker } from "../pickers/TaskAssigneePicker";
import { TaskStatusPicker } from "../pickers/TaskStatusPicker";
import { TaskRowActionMenu } from "./TaskRowActionMenu";

interface TaskTableRowProps {
  task: Task;
  assignees: Assignee[];
  onOpenTaskDetails: (taskId: string) => void;
  onUpdateTask: (input: UpdateTaskInput) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskTableRow({
  task,
  assignees,
  onOpenTaskDetails,
  onUpdateTask,
  onDeleteTask,
}: TaskTableRowProps) {
  return (
    <div className="group grid grid-cols-[96px_1.5fr_160px_220px] items-center gap-3 bg-white px-5 py-4 transition last:rounded-b-2xl">
      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onOpenTaskDetails(task.id)}
          className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
        >
          Details
        </button>

        <TaskRowActionMenu onDeleteTask={() => onDeleteTask(task.id)} />
      </div>

      <div className="min-w-0">
        <EditableTaskTitleCell
          title={task.title}
          onSave={(title) => onUpdateTask({ ...task, title })}
        />
      </div>

      <div>
        <TaskStatusPicker
          value={task.status}
          onChange={(status) => onUpdateTask({ ...task, status })}
          showLabel={false}
        />
      </div>
      <TaskAssigneePicker
        assignees={assignees}
        value={task.assigneeId}
        showLabel={false}
        onChange={(assigneeId) => onUpdateTask({ ...task, assigneeId })}
        dropdownAlign="right"
      />
    </div>
  );
}
