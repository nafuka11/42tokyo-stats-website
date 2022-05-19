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
      return {
        y: Math.round(percent * 100) / 100,
        current: studentStatus[key].current,
        bh: studentStatus[key].blackholed,
      };
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
    tooltip: {
      useHTML: true,
      headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
      pointFormat:
        '<tr><td>在籍</td><td style="text-align: right"><b>{point.current}</b></td>' +
        '<tr><td>BH</td><td style="text-align: right"><b>{point.bh}</b></td>' +
        '<tr><td>生存率</td><td style="text-align: right">{point.y}%</td>',
      footerFormat: "</table>",
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
