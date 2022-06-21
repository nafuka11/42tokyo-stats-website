import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { TIMEZONE_FRONT } from "../../../constants/time";
import { getTimezoneOffset } from "date-fns-tz";

type Props = {
  students: { count: number; updatedAt: Date }[];
};

const StudentLineChart = (props: Props) => {
  const { students } = props;

  const options: Highcharts.Options = {
    title: {
      text: "",
    },
    time: {
      timezoneOffset: (getTimezoneOffset(TIMEZONE_FRONT) / 1000 / 60) * -1,
    },
    xAxis: {
      title: {
        text: "",
      },
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%m/%d",
        week: "%m/%d",
        month: "%Y/%m",
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
      opposite: true,
    },
    tooltip: {
      headerFormat: "{point.x:%Y/%m/%d}<br/>",
      pointFormat:
        '<span style="color: {point.color}">\u25CF</span> 学生数: <b>{point.y}</b>',
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "line",
        data: students.map((v) => ({ x: v.updatedAt.getTime(), y: v.count })),
      },
    ],
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{
        style: { height: "100%", witdh: "100%" },
      }}
    />
  );
};

export default StudentLineChart;
