import {
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

type Props = {
  beginAtList: string[];
  maxLevel: number;
  currentStudents: number[][];
  allStudents: number[][];
};

const BeginAtLevelTable = (props: Props) => {
  const { beginAtList, maxLevel, currentStudents, allStudents } = props;
  const [showAllData, setShowAllData] = useState(false);

  const tableData = showAllData ? allStudents : currentStudents;

  const handleChange = () => setShowAllData((prev) => !prev);

  return (
    <>
      <FormControlLabel
        control={<Switch />}
        checked={showAllData}
        onChange={handleChange}
        label="全学生のデータを表示する"
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>入学日</TableCell>
              {Array.from({ length: maxLevel + 1 }).map((_, lv) => (
                <TableCell key={lv} align="right">{`Lv. ${lv}`}</TableCell>
              ))}
              <TableCell align="right">合計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beginAtList.map((beginAt, i) => (
              <TableRow key={beginAt}>
                <TableCell>{beginAt}</TableCell>
                {tableData[i].map((count, lv) => (
                  <TableCell key={`${beginAt}-${lv}`} align="right">
                    {count}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell>合計</TableCell>
              {tableData[tableData.length - 1].map((count, lv) => (
                <TableCell key={`sum-${lv}`} align="right">
                  {count}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BeginAtLevelTable;
