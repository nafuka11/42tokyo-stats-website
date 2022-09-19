import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
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
} as ComponentMeta<typeof LevelPieChart>;

export const ZeroToEightLevels: ComponentStoryObj<typeof LevelPieChart> = {
  args: {
    students: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    beginAt: "2042-01-01",
  },
};

export const ZeroToTenLevels: ComponentStoryObj<typeof LevelPieChart> = {
  args: {
    students: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    beginAt: "2042-01-01",
  },
};

export const OneLevel: ComponentStoryObj<typeof LevelPieChart> = {
  args: {
    students: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    beginAt: "2042-01-01",
  },
};
