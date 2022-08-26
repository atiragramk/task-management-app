import { Modal } from "../../../../components/Modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Project } from "../../../../types";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { projectCreateStateSelector } from "../../selectors/projects";

type CreateProjectModalProps = {
  onClose: () => void;
  onConfirm: (data: Partial<Project>) => void;
};

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const { loading } = useSelector(projectCreateStateSelector);
  const createProjectSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProjectSchema),
  });
  const onSubmit = async (values: Partial<Project>) => {
    try {
      onConfirm(values);
    } catch (error) {}
  };
  return (
    <Modal
      loading={loading}
      formName="create_project"
      title="Create Project"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} id="create_project">
        <FormControl sx={{ width: "100%" }}>
          <FormLabel>Project Name</FormLabel>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                error={Boolean(errors.name)}
                helperText={errors.name?.message as ReactNode}
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel>Description</FormLabel>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                multiline={true}
                rows={5}
                error={Boolean(errors.description)}
                helperText={errors.description?.message as ReactNode}
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
      </form>
    </Modal>
  );
};
