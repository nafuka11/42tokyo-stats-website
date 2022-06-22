import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { PeriodData } from "../../types/Contents";
import TabPanel from "../common/TabPanel";
import TransitionLineChart from "./charts/TransitionLineChart";
import StudentTransitionTab from "./StudentTransitionTab";

type Props = {
  weeklyData: PeriodData[];
};

const StudentTransitionContent = (props: Props) => {
  const { weeklyData } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const currentStudentSum = weeklyData[weeklyData.length - 1].currentStudentSum;
  const previousStudentSum = weeklyData[0].currentStudentSum;
  const currentEvaluationPointAverage =
    weeklyData[weeklyData.length - 1].evaluationPointAverage;
  const previousEvaluationPointAverage = weeklyData[0].evaluationPointAverage;

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Box sx={{ height: 100, textAlign: "center" }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab
            label={
              <StudentTransitionTab
                title="学生数"
                current={currentStudentSum}
                previous={previousStudentSum}
              />
            }
          />
          <Tab
            label={
              <StudentTransitionTab
                title="エバポ平均"
                current={currentEvaluationPointAverage}
                previous={previousEvaluationPointAverage}
              />
            }
          />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ height: { xs: 140, sm: 180 } }}>
          <TransitionLineChart
            name="学生数"
            data={weeklyData}
            pickData={(data) => data.currentStudentSum}
            unit="人"
          />
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Box sx={{ height: { xs: 140, sm: 180 } }}>
          <TransitionLineChart
            name="エバポ平均"
            data={weeklyData}
            pickData={(data) => data.evaluationPointAverage}
            fixedDigit={2}
          />
        </Box>
      </TabPanel>
    </>
  );
};

export default StudentTransitionContent;
