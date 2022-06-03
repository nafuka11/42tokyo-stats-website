import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { LevelUserData } from "../../types/LevelBeginAtData";
import { LEVEL_COLORS } from "../../constants/colors";

type Props = {
  levels: LevelUserData[];
  beginAt: string;
};

const LevelPieChart = (props: Props) => {
  const { levels, beginAt } = props;
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
        data: levels.map((levelUser) => ({
          x: levelUser.level,
          y: levelUser.count,
          color: LEVEL_COLORS[levelUser.level],
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LevelPieChart;
