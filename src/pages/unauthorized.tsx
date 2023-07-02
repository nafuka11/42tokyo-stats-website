import { Link as MUILink, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";

const UnauthorizedPage: NextPage = () => {
  return (
    <Stack justifyContent="center" textAlign="center" pt={5} spacing={1}>
      <Typography variant="h5">Authorization failed</Typography>
      <Typography variant="h6">
        Move to{" "}
        <MUILink component={Link} href="/">
          Top page
        </MUILink>
      </Typography>
    </Stack>
  );
};

export default UnauthorizedPage;
