import { Meta, StoryObj } from "@storybook/nextjs";
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
} as Meta<typeof SurvivalRateChart>;

export const Default: StoryObj<typeof SurvivalRateChart> = {
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
