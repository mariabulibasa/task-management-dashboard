export interface DummyJsonAssignees {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface DummyJsonAssigneesResponse {
  users: DummyJsonAssignees[];
  total: number;
  skip: number;
  limit: number;
}
