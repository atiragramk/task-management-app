import * as yup from "yup";

const assigneeTaskSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string(),
  _id: yup.string(),
  updatedAt: yup.string(),
  createdAt: yup.string(),
  __v: yup.number(),
});

export const createTaskSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string(),
  statusId: yup.string().required("Required"),
  priority: yup.string().required("Required"),
  assignee: yup.array().of(assigneeTaskSchema),
});
