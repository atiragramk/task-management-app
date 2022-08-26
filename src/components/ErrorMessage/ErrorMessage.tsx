import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import error from "../../assets/img/error.gif";
import { StyledContainer } from "./styled";

export const ErrorMessage = () => {
  return (
    <StyledContainer>
      <img src={error} alt="error" />
      <Button component={Link} variant="contained" to="/">
        Back to Main
      </Button>
    </StyledContainer>
  );
};
