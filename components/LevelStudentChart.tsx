import HighchartsReact from "highcharts-react-official";
import Highcharts, { SeriesOptionsType } from "highcharts";
import { LevelBeginAtData } from "../types/LevelUserData";
import { MouseEvent, useState } from "react";
import { Button } from "@mui/material";

type Props = {
  levelBeginAtData: LevelBeginAtData;
  maxLevel: number;
};

const LevelStudentChart = (props: Props) => {
  const { levelBeginAtData, maxLevel } = props;
  const [stacking, setStacking] = useState<boolean>(true);

  const series: SeriesOptionsType[] = Object.keys(levelBeginAtData).map(
    (key) => {
      return {
        type: "column",
        name: key,
        data: [...Array(maxLevel + 1)].map(
          (_, i) =>
            levelBeginAtData[key].find((lv) => lv.level === i)?.count ?? 0
        ),
      };
    }
  );
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
    plotOptions: {
      column: {
        stacking: stacking ? "normal" : "percent",
      },
    },
    series,
  };

  const toggleStacking = (_: MouseEvent<HTMLElement>) =>
    setStacking((prev) => !prev);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Button onClick={toggleStacking}>toggle percentage</Button>
    </>
  );
};

export default LevelStudentChart;
