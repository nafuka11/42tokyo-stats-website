import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { LevelBeginAtData } from "../types/LevelUserData";
import { MouseEvent, useState } from "react";
import { Button } from "@mui/material";

type Props = {
  levelBeginAtData: LevelBeginAtData;
  maxLevel: number;
};

type SeriesType = {
  type: "bar";
  name: string;
  data: number[];
};

const LevelBeginAtChart = (props: Props) => {
  const { levelBeginAtData, maxLevel } = props;
  const [stacking, setStacking] = useState<boolean>(true);

  const series: SeriesType[] = [];
  Object.keys(levelBeginAtData).forEach((key) => {
    for (let i = 0; i <= maxLevel; i++) {
      const count =
        levelBeginAtData[key].find((lv) => lv.level === i)?.count ?? 0;
      const find = series.find((v) => v.name === i.toString());
      if (find) {
        find.data.push(count);
      } else {
        series.push({
          type: "bar",
          name: i.toString(),
          data: [count],
        });
      }
    }
  });
  series.sort((a, b) => (a.name > b.name ? -1 : 1));

  const options: Highcharts.Options = {
    title: {
      text: "入学月別Lv",
    },
    xAxis: {
      categories: Object.keys(levelBeginAtData),
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
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

export default LevelBeginAtChart;
