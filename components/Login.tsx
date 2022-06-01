import { Button, Container, styled, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

const LoginButton = styled(Button)({
  color: "#fff",
  backgroundImage: "linear-gradient(270deg,#2dd57a,#00babc)",
  textTransform: "none",
});

const Login = () => {
  return (
    <Container
      sx={{
        pt: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoginButton
        onClick={() => signIn("42-school")}
        size="large"
        sx={{ width: 300 }}
      >
        <Typography variant="h5">Login with 42</Typography>
      </LoginButton>
    </Container>
  );
};

export default Login;
