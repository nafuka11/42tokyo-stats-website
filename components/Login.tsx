import { Button, Container, Grid, styled, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

const LoginButton = styled(Button)({
  color: "#fff",
  backgroundImage: "linear-gradient(270deg,#2dd57a,#00babc)",
  textTransform: "none",
});

const Login = () => {
  return (
    <Container sx={{ pt: 2 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item>
          <LoginButton
            onClick={() => signIn("42-school")}
            size="large"
            sx={{ width: 300 }}
          >
            <Typography variant="h5">Login with 42</Typography>
          </LoginButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
