import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns-tz";
import { TIMEZONE_FRONT } from "../../constants/time";

type Props = {
  updatedAt: string;
};

const LastUpdate = (props: Props) => {
  const { updatedAt } = props;
  const updatedDate = new Date(updatedAt);

  return (
    <Box>
      <Typography>最終更新</Typography>
      <Typography variant="caption">
        {format(updatedDate, "yyyy/MM/dd HH:mm:ss", {
          timeZone: TIMEZONE_FRONT,
        })}
      </Typography>
    </Box>
  );
};

export default LastUpdate;
