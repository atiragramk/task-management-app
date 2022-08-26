export type Task = {
  _id: string;
  title: string;
  description?: string;
  key: string;
  statusId: string;
  priority: string;
  projectId: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  assignee: User[] | [];
};

export type Status = {
  _id: string;
  key: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
};

export type SortedTask = {
  _id: string;
  records: Task[];
  count: number;
};

export type Modal = {
  open?: boolean;
  name?: string | null;
};

export type Params = {
  status?: string;
  priority?: string;
  search?: string;
  assignee?: string[];
  userData?: User[];
  projectId?: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  color: string;
};

export type CreateThunkType = {
  data: Partial<Task | Status>;
  params: Partial<Params>;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  shortName: string;
};

export enum ItemTypes {
  CARD = "CARD",
}
