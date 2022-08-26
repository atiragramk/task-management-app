import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import notFound from "../../assets/img/404.gif";
import { StyledContainer, StyledImage, StyledTypography } from "./styled";

const Page404 = () => {
  return (
    <StyledContainer>
      <StyledTypography color="primary" variant="h1">
        404
      </StyledTypography>
      <Typography variant="h5">whoops, nothing to see here</Typography>
      <StyledImage src={notFound} alt="not found" />
      <Button to="/" component={Link} variant="contained">
        Back to main
      </Button>
    </StyledContainer>
  );
};

export default Page404;
