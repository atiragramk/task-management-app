import { Box, Button, CircularProgress, Container } from "@mui/material";

import { TaskListCard } from "./components/TaskListCard";
import { SortingBar } from "./components/SortingBar";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { boardListFetch, boardStatusListFetch } from "./thunk/board";
import { AppDispatch } from "../../store";
import * as selectors from "./selectors/board";

const Board = () => {
  const { loading, error, data } = useSelector(selectors.boardStatusSelector);
  const taskList = useSelector(selectors.boardDataSelector);
  console.log(taskList);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(boardListFetch());
    dispatch(boardStatusListFetch());
  }, []);

  return (
    <Container maxWidth="xl">
      <SortingBar data={data} />
      <Box sx={{ display: "flex", overflow: "auto", height: "78vh" }}>
        {loading && !error && data.length === 0 && <CircularProgress />}
        {!error &&
          data.length > 0 &&
          data.map((status) => {
            return (
              <TaskListCard
                key={status._id}
                status={status}
                taskList={taskList}
              />
            );
          })}
        <Box sx={{ width: 220, m: 1 }}>
          <Button fullWidth={true} variant="outlined" startIcon={<AddIcon />}>
            Create column
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Board;
