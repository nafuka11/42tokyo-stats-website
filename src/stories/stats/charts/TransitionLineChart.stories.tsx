import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import TransitionLineChart from "../../../components/stats/charts/TransitionLineChart";
import { PeriodData } from "../../../types/Contents";

export default {
  component: TransitionLineChart,
  decorators: [
    (Story) => (
      <div style={{ height: 300, width: 300 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TransitionLineChart>;

const weeklyData = [
  {
    currentStudentSum: 23,
    evaluationPointAverage: 1.5,
    updatedAt: "2042-03-04T15:00:00.000Z",
  },
  {
    currentStudentSum: 25,
    evaluationPointAverage: 1.375,
    updatedAt: "2042-03-11T15:00:00.000Z",
  },
  {
    currentStudentSum: 24,
    evaluationPointAverage: 1.5,
    updatedAt: "2042-03-18T15:00:00.000Z",
  },
  {
    currentStudentSum: 28,
    evaluationPointAverage: 2.0,
    updatedAt: "2042-03-25T15:00:00.000Z",
  },
  {
    currentStudentSum: 21,
    evaluationPointAverage: 2.42,
    updatedAt: "2042-04-01T15:00:00.000Z",
  },
];

export const WeeklyCurrentStudentSum: ComponentStoryObj<
  typeof TransitionLineChart
> = {
  args: {
    name: "学生数",
    data: weeklyData,
    pickData: (data: PeriodData) => data.currentStudentSum,
    unit: "人",
  },
};

export const WeeklyEvaluationPointAverage: ComponentStoryObj<
  typeof TransitionLineChart
> = {
  args: {
    name: "エバポ平均",
    data: weeklyData,
    pickData: (data: PeriodData) => data.evaluationPointAverage,
    fixedDigit: 2,
  },
};
