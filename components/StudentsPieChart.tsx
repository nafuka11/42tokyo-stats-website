import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { StudentSummaryData } from "../types/StudentSummaryData";

type Props = {
  students: StudentSummaryData;
};

const StudentPieChart = (props: Props) => {
  const { students } = props;

  const options: Highcharts.Options = {
    title: {
      text: `在籍/全体<br>${students.current}/${
        students.current + students.blackholed
      }`,
      align: "center",
      verticalAlign: "middle",
    },
    chart: {
      height: "260",
    },
    plotOptions: {
      pie: {
        innerSize: "60%",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
          distance: -20,
        },
        size: "75%",
      },
    },
    series: [
      {
        type: "pie",
        name: "students",
        data: [
          ["在籍", students.current],
          ["BH", students.blackholed],
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StudentPieChart;
