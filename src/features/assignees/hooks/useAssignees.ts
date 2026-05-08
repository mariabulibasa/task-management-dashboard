import { useQuery } from "@tanstack/react-query";
import { getAssignees } from "../api/assigneeApi";

export function useAssignees() {
  return useQuery({
    queryKey: ["assignees"],
    queryFn: getAssignees,
  });
}
