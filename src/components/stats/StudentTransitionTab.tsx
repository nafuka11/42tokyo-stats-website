import { Typography } from "@mui/material";
import ChangeRateText from "./ChangeRateText";

type Props = {
  title: string;
  current: number;
  previous: number;
};

const StudentTransitionTab = (props: Props) => {
  const { title, current, previous } = props;
  const changeRate = (current / previous) * 100 - 100;

  return (
    <>
      <Typography variant="body2" color="#333333">
        {title}
      </Typography>
      <Typography variant="h5" color="inherit">
        {Number.isInteger(current) ? current : current.toFixed(2)}
      </Typography>
      <ChangeRateText changeRate={changeRate} />
    </>
  );
};

export default StudentTransitionTab;
