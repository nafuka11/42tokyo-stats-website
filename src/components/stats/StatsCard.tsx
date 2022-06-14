import { Paper } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  padding?: number;
};

const StatsCard = (props: Props) => {
  const { children, padding } = props;

  return (
    <Paper sx={{ p: padding ?? 2, height: "100%", width: "100%" }}>
      {children}
    </Paper>
  );
};

export default StatsCard;
