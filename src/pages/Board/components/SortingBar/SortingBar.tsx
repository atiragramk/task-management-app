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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { Params, Status } from "../../../../types";

type SortingBarProps = {
  data: Status[];
  onFilter: (params: Params) => void;
};

export const SortingBar: React.FC<SortingBarProps> = (props) => {
  const { data, onFilter } = props;
  return (
    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ width: 150 }}>
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
          label="Priority"
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
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};
