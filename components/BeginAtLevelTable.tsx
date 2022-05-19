import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { LevelBeginAtData } from "../types/LevelBeginAtData";

type Props = {
  levelBeginAt: LevelBeginAtData;
  maxLevel: number;
};

const BeginAtLevelTable = (props: Props) => {
  const { levelBeginAt, maxLevel } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>入学日</TableCell>
          {[...Array(maxLevel + 1)].map((_, i) => (
            <TableCell key={i}>{`Lv. ${i}`}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(levelBeginAt).map((key) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            {levelBeginAt[key].map((lv) => (
              <TableCell key={`${key}-${lv.level}`}>{lv.count}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BeginAtLevelTable;
