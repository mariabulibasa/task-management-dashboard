// assignees/hooks/useFilteredAssignees.ts

import { useMemo, useState } from "react";
import type { Assignee } from "../../assignees/types/assignees.types";

export function useFilteredAssignees(assignees: Assignee[]) {
  const [assigneeSearchTerm, setAssigneeSearchTerm] = useState("");

  const visibleAssignees = useMemo(() => {
    const normalizedSearchTerm = assigneeSearchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return assignees;
    }

    return assignees.filter((assignee) =>
      assignee.name.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [assignees, assigneeSearchTerm]);

  function clearAssigneeSearch() {
    setAssigneeSearchTerm("");
  }

  return {
    assigneeSearchTerm,
    setAssigneeSearchTerm,
    visibleAssignees,
    clearAssigneeSearch,
  };
}
