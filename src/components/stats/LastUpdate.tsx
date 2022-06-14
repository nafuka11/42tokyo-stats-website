import { Typography } from "@mui/material";
import { format } from "date-fns-tz";
import { TIMEZONE_FRONT } from "../../constants/time";

type Props = {
  updatedAt: string;
};

const LastUpdate = (props: Props) => {
  const { updatedAt } = props;
  const updatedDate = new Date(updatedAt);

  return (
    <Typography variant="caption">
      {`Last Updated: ${format(updatedDate, "yyyy-MM-dd HH:mm:ss", {
        timeZone: TIMEZONE_FRONT,
      })}`}
    </Typography>
  );
};

export default LastUpdate;
