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
import { Status } from "../../../../types";

type SortingBarProps = {
  data: Status[];
};

export const SortingBar: React.FC<SortingBarProps> = (props) => {
  const { data } = props;
  return (
    <Stack direction="row" spacing={2} sx={{ p: 2 }}>
      <TextField
        size="small"
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
          label="Priority"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem>Low</MenuItem>
          <MenuItem>High</MenuItem>
          <MenuItem>Critical</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ width: 150 }}>
        Add issue
      </Button>
    </Stack>
  );
};
