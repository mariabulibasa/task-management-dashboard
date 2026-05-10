import type { Assignee } from "../../assignees/types/assignees.types";
import type { Task } from "../types/task.types";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { TaskTableToolbar } from "./TaskTableToolbar";
import { Ellipsis } from "lucide-react";

interface TaskTableProps {
  tasks: Task[];
  assignees: Assignee[];
  onNewTask: () => void;
  onOpenTaskDetails: (taskId: string) => void;
}

export function TaskTable({
  tasks,
  assignees,
  onNewTask,
  onOpenTaskDetails,
}: TaskTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-5 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="shrink-0">
            <h2 className="text-lg font-semibold text-neutral-900">Tasks</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Hover over a row to open details or access more actions.
            </p>
          </div>

          <TaskTableToolbar onNewTask={onNewTask} />
        </div>
      </div>

      <div className="grid grid-cols-[96px_1.5fr_160px_220px] border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
        <div />
        <div>Task name</div>
        <div>Status</div>
        <div>Assignee</div>
      </div>

      <div className="divide-y divide-neutral-100">
        {tasks.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="mt-1 text-sm text-neutral-500">
              There are no tasks to display yet.
            </p>
          </div>
        ) : (
          tasks.map((task) => {
            const user = assignees.find(
              (assignee) => task.assigneeId === assignee.id,
            );
            return (
              <div
                key={task.id}
                className="group grid grid-cols-[96px_1.5fr_160px_220px] items-center gap-3 px-5 py-4 transition bg-white"
              >
                <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onOpenTaskDetails(task.id)}
                    className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    Details
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      //Implement logic for actions menu (e.g delete row)
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-300 bg-white text-sm font-medium text-neutral-600 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                    aria-label="More actions"
                  >
                    <Ellipsis size={16} />
                  </button>
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-neutral-900">
                    {task.title}
                  </p>
                </div>

                <div>
                  <TaskStatusBadge status={task.status} />
                </div>

                <div className="truncate text-sm text-neutral-600">
                  {user?.name ?? ""}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
