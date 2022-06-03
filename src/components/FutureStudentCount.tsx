import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StudentStatusData } from "../types/StudentStatusData";

type Props = {
  studentStatus: StudentStatusData;
};

const FutureStudentCount = (props: Props) => {
  const { studentStatus } = props;
  const futureBeginAtList = Object.keys(studentStatus).filter(
    (key) => studentStatus[key].future
  );

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
            {futureBeginAtList.map((beginAt) => (
              <TableRow key={beginAt}>
                <TableCell>{beginAt}</TableCell>
                <TableCell>{studentStatus[beginAt].future}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FutureStudentCount;
