import type { Assignee } from "../types/assignees.types";
import type { DummyJsonAssignees } from "./dummyJsonAssignee.types";

export function mapDummyJsonUserToAssignee(user: DummyJsonAssignees): Assignee {
  return {
    id: String(user.id),
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  };
}
