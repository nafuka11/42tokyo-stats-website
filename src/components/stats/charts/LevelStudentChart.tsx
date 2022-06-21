import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { LEVEL_COLORS } from "../../../constants/colors";
import { getLevelTotalArray } from "../../../services/pick-contents";

type Props = {
  currentStudents: number[][];
  studentCount: number;
  maxLevel: number;
};

const LevelStudentChart = (props: Props) => {
  const { currentStudents, studentCount, maxLevel } = props;

  const options: Highcharts.Options = {
    title: {
      text: "Lv別学生数",
    },
    xAxis: {
      categories: Array.from({ length: maxLevel + 1 }, (_, i) => i.toString()),
      title: {
        text: "Lv",
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        format: "{value}人",
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
        data: getLevelTotalArray(currentStudents).map((value, i) => ({
          y: value,
          color: LEVEL_COLORS[i],
          percentage: (value / studentCount) * 100,
        })),
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: "100%", witdh: "100%" } }}
    />
  );
};

export default LevelStudentChart;
