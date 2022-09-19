import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import LevelStudentChart from "../../../components/stats/charts/LevelStudentChart";

export default {
  component: LevelStudentChart,
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
} as ComponentMeta<typeof LevelStudentChart>;

export const ZeroToEightLevels: ComponentStoryObj<typeof LevelStudentChart> = {
  args: {
    currentStudents: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 36],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 40],
      [1, 3, 5, 7, 9, 11, 13, 15, 17, 76],
    ],
    studentCount: 76,
    maxLevel: 8,
  },
};

export const ZeroToTenLevels: ComponentStoryObj<typeof LevelStudentChart> = {
  args: {
    currentStudents: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 55],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 61],
      [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 116],
    ],
    studentCount: 76,
    maxLevel: 10,
  },
};
