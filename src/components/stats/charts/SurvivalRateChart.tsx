import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

type Props = {
  beginAtList: string[];
  allStudents: number[];
  currentStudents: number[];
  futureStudentIndexes: number[];
};

const SurvivalRateChart = (props: Props) => {
  const { beginAtList, allStudents, currentStudents, futureStudentIndexes } =
    props;
  const studentsData = currentStudents
    .map((value, index) => ({ current: value, all: allStudents[index], index }))
    .filter((students) => !futureStudentIndexes.includes(students.index));

  const survivalRates = studentsData.map((students) => {
    const percent = (students.current / students.all) * 100;
    return {
      y: Math.round(percent * 100) / 100,
      current: students.current,
      bh: students.all - students.current,
    };
  });

  const options: Highcharts.Options = {
    title: {
      text: "生存率",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: studentsData.map((v) => beginAtList[v.index]),
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        format: "{value}%",
      },
      max: 100,
    },
    chart: {
      marginRight: 50,
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
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: "100%" } }}
    />
  );
};

export default SurvivalRateChart;
