import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Container } from "@mui/system";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

import * as selectors from "./selectors/projects";
import { AppDispatch } from "../../store";
import { projectCreateFetch, projectsListFetch } from "./thunk/projects";
import { modalStateSelector } from "../../store/modal/selectors/modal";
import { modalOpenToggleAction } from "../../store/modal/reducer/modal";
import { CreateProjectModal } from "./components/CreateProjectModal";

import { Project } from "../../types";
import { StyledLink } from "./styled";
import { MODAL_CREATE_PROJECT_NAME } from "./constants";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { ErrorMessage } from "../../components/ErrorMessage";

const Projects = () => {
  const data = useSelector(selectors.projectsDataSelector);
  const loading = useSelector(selectors.projectsLoadingSelector);
  const error = useSelector(selectors.projectsErrorSelector);

  const { open, name } = useSelector(modalStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(projectsListFetch());
  }, [dispatch]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <StyledLink to={`/projects/${params.row._id}`}>
          {params.value}
        </StyledLink>
      ),
    },
    { field: "description", headerName: "Description", width: 1000 },
    { field: "shortName", headerName: "Key", width: 200 },
  ];

  const handleCreateProjectModalToogle = () => {
    dispatch(modalOpenToggleAction({ name: MODAL_CREATE_PROJECT_NAME }));
  };
  const handleCreateProject = (data: Partial<Project>) => {
    dispatch(projectCreateFetch(data));
  };

  return (
    <ErrorBoundary>
      {loading && <LinearProgress />}
      {!error && !loading && (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Projects</Typography>
            <Button
              sx={{ mb: 2 }}
              onClick={handleCreateProjectModalToogle}
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
            >
              Create Project
            </Button>
          </Box>
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
            />
          </Box>
          {open && name === MODAL_CREATE_PROJECT_NAME && (
            <CreateProjectModal
              onConfirm={handleCreateProject}
              onClose={handleCreateProjectModalToogle}
            />
          )}
        </Container>
      )}
      {error && !loading && <ErrorMessage />}
    </ErrorBoundary>
  );
};

export default Projects;
