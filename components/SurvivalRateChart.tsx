import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { StudentStatusData } from "../types/StudentStatusData";

type Props = {
  studentStatus: StudentStatusData;
};

const SurvivalRateChart = (props: Props) => {
  const { studentStatus } = props;
  const survivalRates = Object.keys(studentStatus)
    .filter((key) => studentStatus[key].current)
    .map((key) => {
      const percent =
        (studentStatus[key].current /
          (studentStatus[key].current + studentStatus[key].blackholed)) *
        100;
      return Math.round(percent * 100) / 100;
    });

  const options: Highcharts.Options = {
    title: {
      text: "生存率",
    },
    xAxis: {
      categories: Object.keys(studentStatus).filter(
        (key) => studentStatus[key].current
      ),
    },
    yAxis: {
      title: {
        text: "生存率(%)",
      },
      max: 100,
    },
    chart: {
      marginRight: 50,
      height: 300,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: "{y} %",
          overflow: "allow",
          crop: false,
        },
      },
    },
    series: [
      {
        type: "bar",
        data: survivalRates,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SurvivalRateChart;
