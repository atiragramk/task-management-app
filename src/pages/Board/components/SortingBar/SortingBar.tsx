import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { Params, Status } from "../../../../types";

import { useSelector } from "react-redux";
import { boardFilterParams, boardUsersSelector } from "../../selectors/board";

type SortingBarProps = {
  data: Status[];
  onFilter: (params: Params) => void;
  onReset: () => void;
  onCreateModalOpen: () => void;
};

export const SortingBar: React.FC<SortingBarProps> = (props) => {
  const { data, onFilter, onCreateModalOpen, onReset } = props;
  const { loading, error, userList } = useSelector(boardUsersSelector);
  const params = useSelector(boardFilterParams);

  return (
    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
      <Button
        onClick={onCreateModalOpen}
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        sx={{ width: 150, maxHeight: 40 }}
      >
        Add issue
      </Button>
      <TextField
        size="small"
        onChange={(event) => onFilter({ search: event.target.value })}
        placeholder="Search this board"
        variant="outlined"
        value={params.search}
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
          value={params.status}
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
          value={params.priority}
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
        sx={{ maxWidth: 450, mt: 1, width: 450 }}
        size="small"
        multiple
        loading={loading}
        id="users"
        options={userList}
        filterSelectedOptions
        disableCloseOnSelect
        value={params.userData}
        onChange={(_, data) => {
          const assignee: string[] = [];
          data.forEach((user) => {
            assignee.push(user.email);
          });
          onFilter({ assignee });
          onFilter({ userData: data });
        }}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        renderInput={(params) => (
          <TextField {...params} label="Assignee" placeholder="User" />
        )}
      ></Autocomplete>
      <Button
        size="small"
        variant="outlined"
        onClick={onReset}
        startIcon={<FilterAltOffIcon />}
        sx={{ width: "fit-content", maxHeight: 40 }}
      >
        Clear All
      </Button>
    </Stack>
  );
};
