import { Paper } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const StatsCard = (props: Props) => {
  const { children } = props;

  return <Paper sx={{ p: 2, height: "100%" }}>{children}</Paper>;
};

export default StatsCard;
