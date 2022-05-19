import {
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { LevelBeginAtData } from "../types/LevelBeginAtData";

type Props = {
  current: LevelBeginAtData;
  all: LevelBeginAtData;
  maxLevel: number;
};

const BeginAtLevelTable = (props: Props) => {
  const { current, all, maxLevel } = props;
  const [showAllData, setShowAllData] = useState(false);

  const levelBeginAt = showAllData ? all : current;
  const calcTableData = () => {
    const tableData = Object.keys(levelBeginAt).map((key) => {
      const counts = [...Array(maxLevel + 1)].map(
        (_, lv) => levelBeginAt[key].find((v) => v.level === lv)?.count ?? 0
      );
      const sum = counts.reduce((prev, cur) => prev + cur);
      return [...counts, sum];
    });
    const lastRow = [...Array(maxLevel + 1)].map((_, lv) =>
      tableData.reduce((sum, cur) => sum + cur[lv], 0)
    );
    lastRow.push(lastRow.reduce((prev, cur) => prev + cur));
    tableData.push(lastRow);
    return tableData;
  };
  const tableData = calcTableData();

  const handleChange = () => setShowAllData((prev) => !prev);

  return (
    <>
      <FormControlLabel
        control={<Switch />}
        checked={showAllData}
        onChange={handleChange}
        label="全学生のデータを表示する"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>入学日</TableCell>
            {[...Array(maxLevel + 1)].map((_, i) => (
              <TableCell key={i} align="right">{`Lv. ${i}`}</TableCell>
            ))}
            <TableCell align="right">合計</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(levelBeginAt).map((key, i) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              {[...Array(maxLevel + 2)].map((_, lv) => (
                <TableCell key={`${key}-${lv}`} align="right">
                  {tableData[i][lv]}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>合計</TableCell>
            {[...Array(maxLevel + 2)].map((_, lv) => (
              <TableCell key={`sum-${lv}`} align="right">
                {tableData[tableData.length - 1][lv]}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default BeginAtLevelTable;
