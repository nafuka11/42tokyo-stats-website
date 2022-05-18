import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Container, Grid } from "@mui/material";
import StudentPieChart from "../components/StudentsPieChart";
import { fetchCursusUsers } from "../libs/cursus-users";
import {
  getBeginAtList,
  getEvaluationPoints,
  getLevelBeginAtList,
  getStudentSummary,
} from "../libs/process-cursus-users";
import { CursusUser } from "../types/CursusUser";
import EvaluationPointSummary from "../components/EvaluationPointSummary";
import LevelStudentChart from "../components/LevelStudentChart";
import LevelBeginAtChart from "../components/LevelBeginAtChart";

const LevelPieChart = dynamic(() => import("../components/LevelPieChart"), {
  ssr: false,
});

type Props = {
  cursusUsers: CursusUser[];
};

const Stats: NextPage<Props> = (props: Props) => {
  const { cursusUsers } = props;
  const beginAtList = getBeginAtList(cursusUsers);
  const studentsSummary = getStudentSummary(cursusUsers);
  const evaluationPoint = getEvaluationPoints(cursusUsers);
  const levelBeginAtData = getLevelBeginAtList(cursusUsers, beginAtList);
  const maxLevel = Math.max(
    ...Object.keys(levelBeginAtData)
      .map((key) => levelBeginAtData[key].map((lv) => lv.level))
      .flat()
  );

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4}>
          <StudentPieChart students={studentsSummary} />
        </Grid>
        <Grid item xs={6} sm={5}>
          <LevelStudentChart
            levelBeginAtData={levelBeginAtData}
            maxLevel={maxLevel}
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <EvaluationPointSummary
            evaluationPoint={evaluationPoint}
            students={studentsSummary.current}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={10}>
          <LevelBeginAtChart
            levelBeginAtData={levelBeginAtData}
            maxLevel={maxLevel}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const cursusUsers = fetchCursusUsers();
  return {
    props: {
      cursusUsers,
    },
  };
};

export default Stats;
