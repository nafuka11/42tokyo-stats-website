import { Typography } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  updatedAt: string;
};

const LastUpdate = (props: Props) => {
  const { updatedAt } = props;

  return (
    <Box>
      <Typography>最終更新</Typography>
      <Typography variant="caption">{updatedAt}</Typography>
    </Box>
  );
};

export default LastUpdate;
