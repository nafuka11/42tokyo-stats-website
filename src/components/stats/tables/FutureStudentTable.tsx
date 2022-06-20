import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getTotalFromRow } from "../../../services/pick-contents";

type Props = {
  beginAtList: string[];
  allStudents: number[][];
  futureStudentIndexes: number[];
};

const FutureStudentTable = (props: Props) => {
  const { beginAtList, allStudents, futureStudentIndexes } = props;
  const futureBeginAtList = futureStudentIndexes.map((index) => ({
    beginAt: beginAtList[index],
    count: getTotalFromRow(allStudents[index]),
  }));

  return (
    <>
      <Typography>今後入学する学生数</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>入学日</TableCell>
              <TableCell>学生数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {futureBeginAtList.map((v) => (
              <TableRow key={v.beginAt}>
                <TableCell>{v.beginAt}</TableCell>
                <TableCell>{v.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FutureStudentTable;
