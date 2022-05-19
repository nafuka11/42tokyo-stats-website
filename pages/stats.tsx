import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Box, Container, Grid } from "@mui/material";
import { fetchCursusUsers } from "../libs/cursus-users";
import {
  getBeginAtList,
  getEvaluationPoints,
  getLevelBeginAtData,
  getLevelStudents,
  getStudentStatusData,
} from "../libs/process-cursus-users";
import { CursusUser } from "../types/CursusUser";
import LevelStudentChart from "../components/LevelStudentChart";
import StudentCount from "../components/StudentCount";
import SurvivalRateChart from "../components/SurvivalRateChart";
import EvaluationPointSummary from "../components/EvaluationPointSummary";
import FutureStudentCount from "../components/FutureStudentCount";
import StatsCard from "../components/StatsCard";

const LevelPieChart = dynamic(() => import("../components/LevelPieChart"), {
  ssr: false,
});

type Props = {
  cursusUsers: CursusUser[];
};

const Stats: NextPage<Props> = (props: Props) => {
  const { cursusUsers } = props;
  const beginAtList = getBeginAtList(cursusUsers);
  const studentStatusData = getStudentStatusData(cursusUsers, beginAtList);
  const evaluationPoint = getEvaluationPoints(cursusUsers);
  const levelBeginAtData = getLevelBeginAtData(cursusUsers, beginAtList);
  const levelStudents = getLevelStudents(levelBeginAtData);
  const maxLevel = Math.max(
    ...Object.keys(levelBeginAtData)
      .map((key) => levelBeginAtData[key].map((lv) => lv.level))
      .flat()
  );
  const studentCount = Object.keys(studentStatusData).reduce(
    (result, key) => result + studentStatusData[key].current,
    0
  );

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        mb={2}
        justifyContent="center"
      >
        <Grid item xs={12} sm={2} md={2}>
          <Box
            height="100%"
            sx={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gap: 1 }}
          >
            <StatsCard>
              <StudentCount count={studentCount} />
            </StatsCard>
            <StatsCard>
              <EvaluationPointSummary
                evaluationPoint={evaluationPoint}
                students={studentCount}
              />
            </StatsCard>
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={4}>
          <StatsCard>
            <LevelStudentChart
              levelStudent={levelStudents}
              studentCount={studentCount}
              maxLevel={maxLevel}
            />
          </StatsCard>
        </Grid>
        <Grid item xs={2} sm={3} md={4}>
          <StatsCard>
            <SurvivalRateChart studentStatus={studentStatusData} />
          </StatsCard>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        mb={2}
      >
        {beginAtList
          .filter((beginAt) => studentStatusData[beginAt].current)
          .map((beginAt) => (
            <Grid item xs={2} sm={2.6} md={3} key={beginAt}>
              <StatsCard>
                <LevelPieChart
                  beginAt={beginAt}
                  levels={levelBeginAtData[beginAt]}
                />
              </StatsCard>
            </Grid>
          ))}
      </Grid>
      <StatsCard>
        <FutureStudentCount studentStatus={studentStatusData} />
      </StatsCard>
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
