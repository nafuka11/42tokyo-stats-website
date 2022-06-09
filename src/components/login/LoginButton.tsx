import { Button, CircularProgress, Typography } from "@mui/material";
import { MouseEventHandler } from "react";

type Props = {
  loading: boolean;
  handleClick: MouseEventHandler<HTMLElement>;
};

const LoginButton = (props: Props) => {
  const { loading, handleClick } = props;

  return (
    <Button
      sx={{
        width: 300,
        height: 48,
        backgroundImage: loading
          ? "linear-gradient(270deg,rgba(45,213,122,0.5),rgba(0,186,188,0.8))"
          : "linear-gradient(270deg,rgba(45,213,122),rgba(0,186,188))",
        textTransform: "none",
      }}
      size="large"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={26} color="inherit" />
      ) : (
        <Typography variant="h5" display="inline">
          Login with 42
        </Typography>
      )}
    </Button>
  );
};

export default LoginButton;
