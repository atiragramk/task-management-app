import { Box, Button, LinearProgress, Container } from "@mui/material";
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

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(boardListFetch());
    dispatch(boardStatusListFetch());
  }, []);

  return (
    <>
      {loading && !error && data.length === 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Container maxWidth="xl">
        <SortingBar data={data} />
        <Box sx={{ display: "flex", overflow: "auto", height: "78vh" }}>
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
    </>
  );
};

export default Board;
