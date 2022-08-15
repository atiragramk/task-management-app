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
  open: boolean;
  name: string | null;
};

export type Params = {
  status?: string;
  priority?: string;
  search?: string;
};
