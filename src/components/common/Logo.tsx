import { Typography } from "@mui/material";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" passHref>
      <Typography sx={{ fontWeight: 500, color: "#444" }} variant="h6">
        42Tokyo Stats
      </Typography>
    </Link>
  );
};

export default Logo;
