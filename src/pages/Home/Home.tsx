import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { StyledTypography } from "./styled";

const Home = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        textAlign: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          m: "50px auto",
          textAlign: "-webkit-center",
        }}
      >
        <Typography variant="h2">
          Organize your work and life, finally.
        </Typography>
        <StyledTypography paragraph={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu
          malesuada lorem. Nullam condimentum bibendum ultrices. Praesent at ex
          mattis, mattis ipsum porta, malesuada arcu. Mauris non eleifend massa,
          id venenatis orci. Proin id faucibus turpis. Sed id maximus lorem.
          Aliquam facilisis dolor a odio sollicitudin, at semper magna
          consequat. Aenean libero magna, porttitor sed mauris quis, tristique
          eleifend neque.
        </StyledTypography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/projects"
          >
            Start for free
          </Button>
          <Button
            color="primary"
            variant="outlined"
            component={Link}
            to="/login"
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
