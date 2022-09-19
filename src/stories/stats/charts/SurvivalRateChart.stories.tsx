import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import SurvivalRateChart from "../../../components/stats/charts/SurvivalRateChart";

export default {
  component: SurvivalRateChart,
  decorators: [
    (Story) => (
      <div style={{ height: 300, width: 300 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { delay: 1500 },
  },
} as ComponentMeta<typeof SurvivalRateChart>;

export const Default: ComponentStoryObj<typeof SurvivalRateChart> = {
  args: {
    beginAtList: [
      "2042-01-01",
      "2042-01-02",
      "2042-01-03",
      "2042-01-04",
      "2042-01-05",
    ],
    allStudents: [1, 3, 4, 5, 6],
    currentStudents: [0, 1, 2, 3, 6],
    futureStudentIndexes: [],
  },
};
