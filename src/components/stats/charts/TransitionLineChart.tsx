import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { TIMEZONE_FRONT } from "../../../constants/time";
import { getTimezoneOffset } from "date-fns-tz";
import { PeriodData } from "../../../types/Contents";

type Props = {
  data: PeriodData[];
  pickData: (data: PeriodData) => number;
  name: string;
  unit?: string;
  fixedDigit?: number;
};

const TransitionLineChart = (props: Props) => {
  const { data, pickData, name, unit, fixedDigit } = props;

  const options: Highcharts.Options = {
    title: {
      text: "",
    },
    time: {
      timezoneOffset: (getTimezoneOffset(TIMEZONE_FRONT) / 1000 / 60) * -1,
    },
    chart: {
      marginRight: 55,
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
        format: `{value}${unit ?? ""}`,
      },
      min: 0,
      opposite: true,
    },
    tooltip: {
      headerFormat: "{point.x:%Y/%m/%d}<br/>",
      pointFormat: `<span style="color: {point.color}">\u25CF</span> ${name}: <b>{point.y:.${
        fixedDigit ?? 0
      }f}</b>`,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "line",
        data: data.map((v) => ({
          x: new Date(v.updatedAt).getTime(),
          y: pickData(v),
        })),
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

export default TransitionLineChart;
