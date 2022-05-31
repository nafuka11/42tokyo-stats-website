import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { LEVEL_COLORS } from "../constants/colors";
import { LevelStudentData } from "../types/LevelStudentData";

type Props = {
  levelStudent: LevelStudentData;
  studentCount: number;
  maxLevel: number;
};

const LevelStudentChart = (props: Props) => {
  const { levelStudent, studentCount, maxLevel } = props;

  const options: Highcharts.Options = {
    title: {
      text: "Lv別学生数",
    },
    xAxis: {
      categories: [...Array(maxLevel + 1)].map((_, i) => i.toString()),
      title: {
        text: "Lv",
      },
    },
    yAxis: {
      title: {
        text: "学生数",
      },
      min: 0,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "Lv. {point.key}<br/>",
      pointFormat:
        '<span style="color: {point.color}">\u25CF</span> {point.y}人 (<b>{point.percentage:.2f}%</b>)',
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          overflow: "allow",
          crop: false,
        },
        borderWidth: 0.2,
        borderColor: "#000000",
      },
    },
    series: [
      {
        type: "column",
        data: Object.keys(levelStudent)
          .map((key) => parseInt(key, 10))
          .map((key) => ({
            y: levelStudent[key],
            color: LEVEL_COLORS[key],
            percentage: (levelStudent[key] / studentCount) * 100,
          })),
      },
    ],
  };
  const a: keyof LevelStudentData = 123;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: "100%" } }}
    />
  );
};

export default LevelStudentChart;
