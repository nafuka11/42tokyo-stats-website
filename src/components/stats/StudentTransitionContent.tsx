import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  INTERVAL_INDEX_WEEKLY,
  INTERVAL_INDEX_MONTHLY,
} from "../../constants/interval-option";
import { PeriodData } from "../../types/Contents";
import TabPanel from "../common/TabPanel";
import TransitionLineChart from "./charts/TransitionLineChart";
import IntervalListMenu from "./IntervalListMenu";
import StudentTransitionTab from "./StudentTransitionTab";

type Props = {
  dailyData: PeriodData[];
  weeklyData: PeriodData[];
  monthlyData: PeriodData[];
};

const generateIntervalText = (
  currentTime: Date,
  previousTime: Date
): string => {
  const days =
    Math.round(
      (currentTime.getTime() - previousTime.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
  return `${days}日間`;
};

const StudentTransitionContent = (props: Props) => {
  const { dailyData, weeklyData, monthlyData } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [intervalIndex, setIntervalIndex] = useState(0);

  const getSelectedData = (intervalIndex: number) => {
    switch (intervalIndex) {
      case INTERVAL_INDEX_WEEKLY:
        return weeklyData;
      case INTERVAL_INDEX_MONTHLY:
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const generateintervalOptions = () => {
    const intervalOptions = [
      generateIntervalText(
        new Date(dailyData[dailyData.length - 1].updatedAt),
        new Date(dailyData[0].updatedAt)
      ),
    ];
    if (weeklyData.length > 1) {
      intervalOptions.push(
        generateIntervalText(
          new Date(weeklyData[weeklyData.length - 1].updatedAt),
          new Date(weeklyData[0].updatedAt)
        )
      );
    }
    if (monthlyData.length > 1) {
      intervalOptions.push(
        generateIntervalText(
          new Date(monthlyData[monthlyData.length - 1].updatedAt),
          new Date(monthlyData[0].updatedAt)
        )
      );
    }
    return intervalOptions;
  };

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const selectedData = getSelectedData(intervalIndex);

  const currentStudentSum =
    selectedData[selectedData.length - 1].currentStudentSum;
  const previousStudentSum = selectedData[0].currentStudentSum;
  const currentEvaluationPointAverage =
    selectedData[selectedData.length - 1].evaluationPointAverage;
  const previousEvaluationPointAverage = selectedData[0].evaluationPointAverage;

  const intervalOptions = generateintervalOptions();

  return (
    <>
      <Box sx={{ height: 90, textAlign: "center" }}>
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
                fixedDigit={2}
              />
            }
          />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ height: { xs: 125, sm: 165 } }}>
          <TransitionLineChart
            name="学生数"
            data={selectedData}
            pickData={(data) => data.currentStudentSum}
            unit="人"
          />
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Box sx={{ height: { xs: 125, sm: 165 } }}>
          <TransitionLineChart
            name="エバポ平均"
            data={selectedData}
            pickData={(data) => data.evaluationPointAverage}
            fixedDigit={2}
          />
        </Box>
      </TabPanel>
      <Box sx={{ pl: 1 }}>
        <IntervalListMenu
          selectedIndex={intervalIndex}
          setSelectedIndex={setIntervalIndex}
          intervalOptions={intervalOptions}
        />
      </Box>
    </>
  );
};

export default StudentTransitionContent;
