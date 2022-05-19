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
          {Object.keys(levelBeginAt).map((key) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              {[...Array(maxLevel + 1)].map((_, i) => {
                const count =
                  levelBeginAt[key].find((v) => v.level === i)?.count ?? 0;
                return (
                  <TableCell key={`${key}-${i}`} align="right">
                    {count}
                  </TableCell>
                );
              })}
              <TableCell align="right">
                {levelBeginAt[key].reduce(
                  (result, cur) => result + cur.count,
                  0
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BeginAtLevelTable;
