import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { LEVEL_COLORS } from "../../../constants/colors";
import { excludeTotalFromRow } from "../../../services/pick-contents";

type Props = {
  students: number[];
  beginAt: string;
};

const LevelPieChart = (props: Props) => {
  const { students, beginAt } = props;

  const data = excludeTotalFromRow(students)
    .map((count, level) => ({ count, level }))
    .filter((v) => v.count > 0);
  const options: Highcharts.Options = {
    title: {
      text: beginAt,
    },
    tooltip: {
      headerFormat: "Lv. {point.point.x}<br/>",
      pointFormat:
        '<span style="color: {point.color}">\u25CF</span> {point.y}人 (<b>{point.percentage:.1f}%</b>)',
    },
    chart: {
      height: "100%",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          alignTo: "connectors",
          format: "Lv. {point.x}<br>({point.y}人)",
        },
        size: "75%",
        borderWidth: 0.2,
        borderColor: "#000000",
      },
    },
    series: [
      {
        type: "pie",
        name: "Students",
        data: data.map((v) => ({
          x: v.level,
          y: v.count,
          color: LEVEL_COLORS[v.level],
        })),
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: "100%", width: "100%" } }}
    />
  );
};

export default LevelPieChart;
