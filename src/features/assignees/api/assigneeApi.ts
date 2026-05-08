import { mapDummyJsonUserToAssignee } from "../../assignees/api/assigneeMappers";
import type { DummyJsonAssigneesResponse } from "../../assignees/api/dummyJsonAssignee.types";
import type { Assignee } from "../../assignees/types/assignees.types";
import { API_BASE_URL } from "../../../config";

export async function getAssignees(): Promise<Assignee[]> {
  const response = await fetch(`${API_BASE_URL}/users?limit=0`);

  if (!response.ok) throw new Error("Failed to fetch assignees");

  const data: DummyJsonAssigneesResponse = await response.json();

  return data.users.map(mapDummyJsonUserToAssignee);
}
