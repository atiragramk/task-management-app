import { useDispatch, useSelector } from "react-redux";
import * as selectors from "./selectors/projects";
import { useEffect } from "react";
import { AppDispatch } from "../../store";
import { projectsListFetch } from "./thunk/projects";
import { Container } from "@mui/system";
import { Box, Button, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { boardFilterParamsSetAction } from "../Board/reducer/board";

const Projects = () => {
  const data = useSelector(selectors.projectsDataSelector);
  const loading = useSelector(selectors.projectsLoadingSelector);
  const error = useSelector(selectors.projectsErrorSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(projectsListFetch());
  }, []);

  const handleProjectSelection = (id: string) => {
    dispatch(boardFilterParamsSetAction({ projectId: id }));
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <Link
          onClick={() => handleProjectSelection(params.row._id)}
          to={`/board`}
        >
          {params.value}
        </Link>
      ),
    },
    { field: "description", headerName: "Description", width: 1000 },
    { field: "shortName", headerName: "Key", width: 200 },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box sx={{ height: "550px" }}>
        <DataGrid
          disableColumnMenu
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={loading}
          rows={data}
          getRowId={(row) => row._id}
          columns={columns}
          onRowClick={() => console.log("fff")}
        />
      </Box>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
      >
        Add Project
      </Button>
    </Container>
  );
};

export default Projects;
