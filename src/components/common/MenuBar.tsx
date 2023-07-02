import GitHubIcon from "@mui/icons-material/GitHub";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { REPOSITORY_URL } from "../../constants/url";
import Logo from "./Logo";

const MenuBar = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#fff" }} elevation={1}>
        <Toolbar variant="dense">
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Link href={REPOSITORY_URL} target="_blank">
            <IconButton size="large">
              <GitHubIcon />
            </IconButton>
          </Link>
          {session && (
            <IconButton sx={{ py: 0 }} onClick={handleClick}>
              <Avatar src={session.user?.image ?? "fallback.png"} />
            </IconButton>
          )}
        </Toolbar>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default MenuBar;
