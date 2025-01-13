import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Login from "../components/login/Login";
import { Fade } from "@mui/material";

const IndexPage: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <Fade in={status !== "loading"}>
      <div>
        <Login />
      </div>
    </Fade>
  );
};

export default IndexPage;
