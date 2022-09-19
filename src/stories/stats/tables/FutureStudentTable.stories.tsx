import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import FutureStudentTable from "../../../components/stats/tables/FutureStudentTable";

export default {
  component: FutureStudentTable,
} as ComponentMeta<typeof FutureStudentTable>;

export const Default: ComponentStoryObj<typeof FutureStudentTable> = {
  args: {
    beginAtList: [
      "2042-01-01",
      "2042-01-02",
      "2042-01-03",
      "2042-01-04",
      "2043-01-01",
    ],
    allStudents: [
      [3, 2, 1, 1, 1, 1, 1, 1, 1, 12],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 8],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 4],
      [3, 1, 0, 0, 0, 0, 0, 0, 0, 4],
      [5, 0, 0, 0, 0, 0, 0, 0, 0, 5],
      [13, 3, 2, 3, 2, 2, 2, 2, 1, 33],
    ],
    futureStudentIndexes: [4],
  },
};
