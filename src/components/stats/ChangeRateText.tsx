import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import { Box, Typography } from "@mui/material";

type Props = {
  changeRate: number;
};

const ChangeRateText = (props: Props) => {
  const { changeRate } = props;

  const iconSx = { fontSize: 14 };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {changeRate === 0 ? (
        <ArrowForwardSharpIcon sx={iconSx} />
      ) : changeRate > 0 ? (
        <ArrowUpwardSharpIcon color="success" sx={iconSx} />
      ) : (
        <ArrowDownwardIcon color="error" sx={iconSx} />
      )}
      <Typography
        variant="caption"
        color={
          changeRate === 0
            ? undefined
            : changeRate > 0
            ? "success.main"
            : "error"
        }
        pl={0.3}
      >
        {`${Math.abs(changeRate).toFixed(2)} %`}
      </Typography>
    </Box>
  );
};

export default ChangeRateText;
