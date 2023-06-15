import React from "react";
import { useSelector } from "react-redux";
import { boardFilterParams, boardUsersSelector } from "../../selectors/board";

import AddIcon from "@mui/icons-material/Add";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  Autocomplete,
} from "@mui/material";

import { priorityList } from "../../constants";
import { Params, Status, User } from "../../../../types";
import { StyledButton, StyledFormControl } from "./styled";

type SortingBarProps = {
  data: Status[];
  onFilter: (params: Params) => void;
  onReset: () => void;
  onCreateModalOpen: () => void;
};

export const SortingBar: React.FC<SortingBarProps> = (props) => {
  const { data, onFilter, onCreateModalOpen, onReset } = props;
  const { loading, userList } = useSelector(boardUsersSelector);
  const params = useSelector(boardFilterParams);

  const handleAssigneeChange = (data: User[]) => {
    const assignee: User[] = [];
    data.forEach((user) => {
      assignee.push(user);
    });
    onFilter({ assignee });
    onFilter({ userData: data });
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
      spacing={2}
      sx={{ pt: 2, pl: 1 }}
    >
      <StyledButton
        sx={{
          minWidth: { xs: "100%", lg: 120 },
        }}
        onClick={onCreateModalOpen}
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        disabled={!data.length}
      >
        Add issue
      </StyledButton>
      <TextField
        size="small"
        onChange={(event) => onFilter({ search: event.target.value })}
        placeholder="Search this board"
        variant="outlined"
        value={params.search}
        disabled={!data.length}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <StyledFormControl size="small">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          label="Status"
          disabled={!data.length}
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
      </StyledFormControl>
      <StyledFormControl size="small">
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          labelId="priority-select-label"
          id="priority-select"
          value={params.priority}
          label="Priority"
          disabled={!data.length}
          onChange={(event) => onFilter({ priority: event.target.value })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {priorityList.map((priority, index) => {
            return (
              <MenuItem key={index} value={priority.toLowerCase()}>
                {priority}
              </MenuItem>
            );
          })}
        </Select>
      </StyledFormControl>
      <StyledFormControl size="small">
        <Autocomplete
          sx={{
            maxWidth: { xs: 450 },
            minWidth: { xs: "100%", lg: 350 },
          }}
          size="small"
          multiple
          loading={loading}
          id="users"
          disabled={!data.length}
          options={userList}
          filterSelectedOptions
          disableCloseOnSelect
          value={params.userData}
          onChange={(_, data) => handleAssigneeChange(data)}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderInput={(params) => (
            <TextField {...params} label="Assignee" placeholder="User" />
          )}
        ></Autocomplete>
      </StyledFormControl>
      <StyledButton
        sx={{
          minWidth: { xs: "100%", lg: 120 },
        }}
        size="small"
        variant="outlined"
        disabled={!data.length}
        onClick={onReset}
        startIcon={<FilterAltOffIcon />}
      >
        Clear All
      </StyledButton>
    </Stack>
  );
};
