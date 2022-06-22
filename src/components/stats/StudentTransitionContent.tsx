import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { PeriodData } from "../../types/Contents";
import TabPanel from "../common/TabPanel";
import TransitionLineChart from "./charts/TransitionLineChart";

type Props = {
  weeklyData: PeriodData[];
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
  const { weeklyData } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const calcChangeRate = (current: number, previous: number) => {
    return (current / previous) * 100 - 100;
  };

  const currentStudentSum = weeklyData[weeklyData.length - 1].currentStudentSum;
  const currentEvaluationPointAverage =
    weeklyData[weeklyData.length - 1].evaluationPointAverage;
  const changeRateStudentSum = calcChangeRate(
    currentStudentSum,
    weeklyData[0].currentStudentSum
  );
  const changeRateEvaluationPointAverage = calcChangeRate(
    currentEvaluationPointAverage,
    weeklyData[0].evaluationPointAverage
  );

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Box sx={{ height: 100, textAlign: "center" }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab
            label={
              <>
                <Typography variant="body2" color="#333333">
                  学生数
                </Typography>
                <Typography variant="h5" color="inherit">
                  {currentStudentSum}
                </Typography>
                <ChangeRateText changeRate={changeRateStudentSum} />
              </>
            }
          />
          <Tab
            label={
              <>
                <Typography variant="body2" color="#333333">
                  エバポ平均
                </Typography>
                <Typography variant="h5" color="inherit">
                  {currentEvaluationPointAverage.toFixed(2)}
                </Typography>
                <ChangeRateText changeRate={changeRateEvaluationPointAverage} />
              </>
            }
          />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
      <Box sx={{ height: { xs: 160, sm: 200 } }}>
        <StudentLineChart students={weeklyStudents} />
      </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
      </TabPanel>
    </>
  );
};

export default StudentTransitionContent;
