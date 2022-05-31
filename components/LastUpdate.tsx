import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { nowDate } from "../libs/process-cursus-users";

const LastUpdate = () => (
  <Box>
    <Typography>最終更新</Typography>
    <Typography variant="h6">{nowDate.toLocaleDateString()}</Typography>
  </Box>
);

export default LastUpdate;
