import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import { Box, Typography } from "@mui/material";
import { PeriodData } from "../../types/Contents";
import TransitionLineChart from "./charts/TransitionLineChart";

type Props = {
  weeklyStudents: PeriodData[];
};

type ChangeRateProps = {
  changeRate: number;
};

const ChangeRateText = (props: ChangeRateProps) => {
  const { changeRate } = props;

  const iconSx = { fontSize: 14 };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {changeRate === 0 ? (
        <ArrowForwardSharpIcon sx={iconSx} />
      ) : changeRate > 0 ? (
        <ArrowUpwardSharpIcon color="primary" sx={iconSx} />
      ) : (
        <ArrowDownwardIcon color="error" sx={iconSx} />
      )}
      <Typography
        variant="caption"
        color={
          changeRate === 0 ? undefined : changeRate > 0 ? "primary" : "error"
        }
        pl={0.3}
      >
        {`${Math.abs(changeRate).toFixed(2)} %`}
      </Typography>
    </Box>
  );
};

const StudentTransitionContent = (props: Props) => {
  const { weeklyStudents } = props;

  const currentStudentCount =
    weeklyStudents[weeklyStudents.length - 1].currentStudentSum;
  const changeRate =
    (currentStudentCount / weeklyStudents[0].currentStudentSum) * 100 - 100;

  return (
    <>
      <Box sx={{ height: 80, textAlign: "center" }}>
        <Typography variant="body2" color="#333333">
          学生数
        </Typography>
        <Typography variant="h5">{currentStudentCount}</Typography>
        <ChangeRateText changeRate={changeRate} />
      </Box>
      <Box sx={{ height: { xs: 160, sm: 200 } }}>
        <StudentLineChart students={weeklyStudents} />
      </Box>
    </>
  );
};

export default StudentTransitionContent;
