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
          <Link
            href={`https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`}
            passHref
          >
            <IconButton
              size="large"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
            >
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
