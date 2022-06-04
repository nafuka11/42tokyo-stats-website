import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fetchCursusUsers } from "../../libs/cursus-users";
import {
  getBeginAtList,
  getEvaluationPoints,
  getLevelBeginAtData,
  getStudentStatusData,
  isCurrentStudent,
} from "../../libs/process-cursus-users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  const { cursusUsers, updatedAt } = fetchCursusUsers();
  const beginAtList = getBeginAtList(cursusUsers);
  const studentStatus = getStudentStatusData(cursusUsers, beginAtList);
  const evaluationPoint = getEvaluationPoints(cursusUsers);
  const levelBeginAtCurrent = getLevelBeginAtData(
    cursusUsers.filter(isCurrentStudent),
    beginAtList
  );
  const levelBeginAtAll = getLevelBeginAtData(cursusUsers, beginAtList);
  const data = {
    beginAtList,
    studentStatus,
    evaluationPoint,
    levelBeginAtCurrent,
    levelBeginAtAll,
    updatedAt,
  };
  res.status(200).json(data);
};

export default handler;
