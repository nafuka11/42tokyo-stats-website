import { Meta, StoryObj } from "@storybook/nextjs";
import LevelPieChart from "../../../components/stats/charts/LevelPieChart";

export default {
  component: LevelPieChart,
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
} as Meta<typeof LevelPieChart>;

export const ZeroToEightLevels: StoryObj<typeof LevelPieChart> = {
  args: {
    students: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    beginAt: "2042-01-01",
  },
};

export const ZeroToTenLevels: StoryObj<typeof LevelPieChart> = {
  args: {
    students: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    beginAt: "2042-01-01",
  },
};

export const OneLevel: StoryObj<typeof LevelPieChart> = {
  args: {
    students: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    beginAt: "2042-01-01",
  },
};
