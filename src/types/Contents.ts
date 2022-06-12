import { LevelBeginAtData } from "./LevelBeginAtData";
import { StudentStatusData } from "./StudentStatusData";

export type Contents = {
  beginAtList: string[];
  studentStatus: StudentStatusData;
  evaluationPoint: number;
  levelBeginAtCurrent: LevelBeginAtData;
  levelBeginAtAll: LevelBeginAtData;
  updatedAt: string;
};
