import type { Assignee } from "../../assignees/types/assignees.types";
import type { Task } from "../types/task.types";
import { TaskStatusBadge } from "./TaskStatusBadge";

interface TaskDetailsProps {
  task: Task | undefined;
  assignee: Assignee | undefined;
  onClose: () => void;
}

export function TaskDetailsPanel({
  task,
  assignee,
  onClose,
}: TaskDetailsProps) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8">
      <button
        type="button"
        aria-label="Close task details"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <section className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        <div className="max-h-[85vh] overflow-y-auto px-18 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-neutral-900">
              {task.title}
            </h2>
          </div>

          <div className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-4 text-sm">
            <div>
              <p className="mb-2 font-medium text-neutral-500">Assignee</p>
              <p className="font-medium text-neutral-900">
                {assignee?.name ?? ""}
              </p>
              <p className="mt-1 text-neutral-500">{assignee?.email ?? ""}</p>
            </div>

            <div>
              <p className="mb-2 font-medium text-neutral-500">Status</p>
              <TaskStatusBadge status={task.status} />
            </div>
          </div>

          <div className="my-10 border-t border-neutral-200" />

          <section>
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Task Description
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
              {task.description}
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
