import { useAssignees } from "./features/assignees/hooks/useAssignees";
import { useTasks } from "./features/tasks/hooks/useTasks";

function App() {
  const tasksQuery = useTasks();
  const assigneesQuery = useAssignees();

  if (tasksQuery.isLoading || assigneesQuery.isLoading) {
    return (
      <main className="min-h-screen bg-neutral-100 p-8">
        <p className="text-neutral-700">Loading dashboard data...</p>
      </main>
    );
  }

  if (tasksQuery.isError || assigneesQuery.isError) {
    return (
      <main className="min-h-screen bg-neutral-100 p-8">
        <p className="text-red-600">Failed to load dashboard data.</p>
      </main>
    );
  }

  const tasks = tasksQuery.data ?? [];
  const assignees = assigneesQuery.data ?? [];

  return (
    <main className="min-h-screen bg-neutral-100 p-8 text-neutral-900">
      <h1 className="text-3xl font-semibold">Task Management Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Tasks loaded</p>
          <p className="mt-2 text-3xl font-semibold">{tasks.length}</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Owners loaded</p>
          <p className="mt-2 text-3xl font-semibold">{assignees.length}</p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">First tasks</h2>

        <ul className="mt-4 space-y-3">
          {tasks.slice(0, 10).map((task) => {
            const assignee = assignees.find(
              (assignee) => assignee.id === task.assigneeId,
            );

            return (
              <li
                key={task.id}
                className="rounded-lg border border-neutral-100 p-3"
              >
                <p className="font-medium">{task.title}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  Status: {task.status} | Assignee:{" "}
                  {assignee?.name ?? "Unknown assignee"}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
