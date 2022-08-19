import React, { ReactNode } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { StyledForm } from "./styled";
import { Status, Task } from "../../../../types";
import { useSelector } from "react-redux";
import { boardUsersSelector } from "../../selectors/board";
import { createTaskSchema } from "./validation";

type TaskFormProp = {
  statusList: Status[];
  name: string;
  onConfirm: (values: Partial<Task>) => void;
};

export const TaskForm: React.FC<TaskFormProp> = (props) => {
  const { statusList, name, onConfirm } = props;
  const { loading, error, userList } = useSelector(boardUsersSelector);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      onConfirm(data);
    } catch (error) {}
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} id={name}>
      <FormControl error={Boolean(errors.title)}>
        <FormLabel>Task Title</FormLabel>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              error={Boolean(errors.title)}
              helperText={errors.title?.message as ReactNode}
              size="small"
              {...field}
            />
          )}
          defaultValue=""
        />
      </FormControl>

      <FormControl>
        <FormLabel>Task Description</FormLabel>
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
              {...field}
            />
          )}
        />
      </FormControl>

      <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
        <FormControl
          error={Boolean(errors.statusId)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <InputLabel id="status">Status</InputLabel>
          <Controller
            name="statusId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="status"
                id="status-select"
                label="Status"
              >
                {statusList.map((status) => {
                  return (
                    <MenuItem key={status.key} value={status.key}>
                      {status.displayName}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.statusId?.message as ReactNode}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={Boolean(errors.priority)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <InputLabel id="priority-select-label">Priority</InputLabel>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="priority-select-label"
                id="priority-select"
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            )}
            defaultValue=""
          />
          <FormHelperText>
            {errors.priority?.message as ReactNode}
          </FormHelperText>
        </FormControl>
        {errors.status && (
          <Typography>{errors.status.message as ReactNode}</Typography>
        )}
      </Stack>
      <FormControl>
        <Controller
          name="assignee"
          control={control}
          render={({ field: { onChange } }) => (
            <Autocomplete
              sx={{ maxWidth: 535, mt: 1 }}
              size="small"
              multiple
              id="users"
              options={userList}
              filterSelectedOptions
              disableCloseOnSelect
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              renderInput={(params) => (
                <TextField {...params} label="Assignee" placeholder="User" />
              )}
              onChange={(_, data) => {
                onChange(data);
                return data;
              }}
            ></Autocomplete>
          )}
        />
      </FormControl>
    </StyledForm>
  );
};
