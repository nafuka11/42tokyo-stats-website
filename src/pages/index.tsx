import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Stats from "../components/Stats";
import { fetchCursusUsers } from "../libs/cursus-users";
import {
  getBeginAtList,
  getEvaluationPoints,
  getLevelBeginAtData,
  getStudentStatusData,
  isCurrentStudent,
} from "../libs/process-cursus-users";
import { StudentStatusData } from "../types/StudentStatusData";
import { LevelBeginAtData } from "../types/LevelBeginAtData";
import { Fade } from "@mui/material";

type Props = {
  beginAtList: string[];
  studentStatus: StudentStatusData;
  evaluationPoint: number;
  levelBeginAtCurrent: LevelBeginAtData;
  levelBeginAtAll: LevelBeginAtData;
  updatedAt: string;
};

const Home: NextPage<Props> = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <Fade in={status !== "loading"}>
      <div>
        {status === "unauthenticated" && <Login />}
        {status === "authenticated" && <Stats {...props} />}
      </div>
    </Fade>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
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
  return {
    props: {
      beginAtList,
      studentStatus,
      evaluationPoint,
      levelBeginAtCurrent,
      levelBeginAtAll,
      updatedAt,
    },
  };
};

export default Home;
