import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import BeginAtLevelTable from "../../../components/stats/tables/BeginAtLevelTable";

export default {
  component: BeginAtLevelTable,
} as ComponentMeta<typeof BeginAtLevelTable>;

export const Default: ComponentStoryObj<typeof BeginAtLevelTable> = {
  args: {
    beginAtList: [
      "2042-01-01",
      "2042-01-02",
      "2042-01-03",
      "2042-01-04",
      "2043-01-01",
    ],
    maxLevel: 8,
    allStudents: [
      [3, 2, 1, 1, 1, 1, 1, 1, 1, 12],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 8],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 4],
      [3, 1, 0, 0, 0, 0, 0, 0, 0, 4],
      [5, 0, 0, 0, 0, 0, 0, 0, 0, 5],
      [13, 3, 2, 3, 2, 2, 2, 2, 1, 33],
    ],
    currentStudents: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
      [0, 0, 0, 1, 1, 1, 1, 1, 0, 5],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 3],
      [3, 1, 0, 0, 0, 0, 0, 0, 0, 4],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [4, 3, 2, 3, 2, 2, 2, 2, 1, 21],
    ],
  },
};
