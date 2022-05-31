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
          {session && (
            <IconButton sx={{ p: 0 }} onClick={handleClick}>
              {session?.user?.image && <Avatar src={session.user.image} />}
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
