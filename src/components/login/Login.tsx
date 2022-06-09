import { Container } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoginButton from "./LoginButton";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLoginButtonClick = () => {
    setLoading(true);
    signIn("42-school");
  };

  return (
    <Container
      sx={{
        pt: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoginButton loading={loading} handleClick={handleLoginButtonClick} />
    </Container>
  );
};

export default Login;
