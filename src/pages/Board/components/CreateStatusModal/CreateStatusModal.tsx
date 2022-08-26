import { Modal } from "../../../../components/Modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { ReactNode } from "react";
import { Status } from "../../../../types";
import { useSelector } from "react-redux";
import { boardStatusSelector } from "../../selectors/board";

type CreateStatusModalProps = {
  onClose: () => void;
  onConfirm: (data: Partial<Status>) => void;
};

export const CreateStatusModal: React.FC<CreateStatusModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const { loading } = useSelector(boardStatusSelector);

  const createStatusSchema = yup.object().shape({
    key: yup
      .string()
      .min(2, "Min length is 2 symbols")
      .max(25, "Max length is 25 symbols")
      .required("Required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createStatusSchema),
  });
  const onSubmit = async (values: Partial<Status>) => {
    try {
      onConfirm(values);
    } catch (error) {}
  };
  return (
    <Modal
      loading={loading}
      onClose={onClose}
      title="Create Column"
      formName="status"
    >
      <form onSubmit={handleSubmit(onSubmit)} id="status">
        <FormControl sx={{ width: "100%" }}>
          <FormLabel>Column Title</FormLabel>
          <Controller
            name="key"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                error={Boolean(errors.key)}
                helperText={errors.key?.message as ReactNode}
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
