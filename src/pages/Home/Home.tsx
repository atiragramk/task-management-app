import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledContainer, StyledTypography } from "./styled";

const Home = () => {
  return (
    <StyledContainer maxWidth="xl">
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontSize: { xs: 50, lg: 62 } }}
      >
        Organize your work and life, finally.
      </Typography>
      <StyledTypography
        paragraph={true}
        sx={{ width: { xs: "100%", lg: 600 } }}
      >
        Task management is the process of creating, prioritizing, delegating,
        and monitoring tasks to ensure they are completed within given
        deadlines. It also involves organizing the workflow and resolving
        bottlenecks to ensure efficient task completion. Task management is an
        essential component of effective project management and successful
        business operations.
      </StyledTypography>
      <Stack direction="row" spacing={2}>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/projects"
        >
          Start project
        </Button>
      </Stack>
    </StyledContainer>
  );
};

export default Home;
