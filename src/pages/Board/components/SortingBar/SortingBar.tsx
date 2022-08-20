import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Stack,
  Autocomplete,
  Chip,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { Params, Status } from "../../../../types";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSelector } from "react-redux";
import { boardUsersSelector } from "../../selectors/board";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type SortingBarProps = {
  data: Status[];
  onFilter: (params: Params) => void;
  onCreateModalOpen: () => void;
};

export const SortingBar: React.FC<SortingBarProps> = (props) => {
  const { data, onFilter, onCreateModalOpen } = props;
  const { loading, error, userList } = useSelector(boardUsersSelector);

  return (
    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
      <Button
        onClick={onCreateModalOpen}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ width: 150 }}
      >
        Add issue
      </Button>
      <TextField
        size="small"
        onChange={(event) => onFilter({ search: event.target.value })}
        placeholder="Search this board"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          sx={{ minWidth: 150 }}
          labelId="status-select-label"
          id="status-select"
          label="Status"
          defaultValue=""
          onChange={(event) => onFilter({ status: event.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((status) => {
            return (
              <MenuItem key={status._id} value={status.key}>
                {status.displayName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          sx={{ minWidth: 150 }}
          labelId="priority-select-label"
          id="priority-select"
          defaultValue=""
          label="Priority"
          onChange={(event) => onFilter({ priority: event.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        sx={{ minWidth: 300, mt: 1 }}
        size="small"
        multiple
        loading={loading}
        id="users"
        options={userList}
        filterSelectedOptions
        disableCloseOnSelect
        onChange={(_, data) => {
          const assignee: string[] = [];
          data.forEach((user) => {
            assignee.push(user.email);
          });
          onFilter({ assignee });
        }}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        renderInput={(params) => (
          <TextField {...params} label="Assignee" placeholder="User" />
        )}
      ></Autocomplete>
    </Stack>
  );
};
