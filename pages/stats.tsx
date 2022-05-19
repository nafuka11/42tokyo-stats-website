import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { fetchCursusUsers } from "../libs/cursus-users";
import {
  getBeginAtList,
  getEvaluationPoints,
  getLevelBeginAtData,
  getLevelStudents,
  getStudentStatusData,
  isCurrentStudent,
} from "../libs/process-cursus-users";
import { CursusUser } from "../types/CursusUser";
import LevelStudentChart from "../components/LevelStudentChart";
import StudentCount from "../components/StudentCount";
import SurvivalRateChart from "../components/SurvivalRateChart";
import EvaluationPointSummary from "../components/EvaluationPointSummary";
import FutureStudentCount from "../components/FutureStudentCount";
import StatsCard from "../components/StatsCard";
import BeginAtLevelTable from "../components/BeginAtLevelTable";
import LastUpdate from "../components/LastUpdate";

const LevelPieChart = dynamic(() => import("../components/LevelPieChart"), {
  ssr: false,
});

type Props = {
  cursusUsers: CursusUser[];
};

const Stats: NextPage<Props> = (props: Props) => {
  const { cursusUsers } = props;
  const theme = useTheme();

  const beginAtList = getBeginAtList(cursusUsers);
  const studentStatus = getStudentStatusData(cursusUsers, beginAtList);
  const evaluationPoint = getEvaluationPoints(cursusUsers);
  const levelBeginAtCurrent = getLevelBeginAtData(
    cursusUsers.filter(isCurrentStudent),
    beginAtList
  );
  const levelBeginAtAll = getLevelBeginAtData(cursusUsers, beginAtList);
  const levelStudents = getLevelStudents(levelBeginAtCurrent);
  const maxLevel = Math.max(
    ...Object.keys(levelBeginAtCurrent)
      .map((key) => levelBeginAtCurrent[key].map((lv) => lv.level))
      .flat()
  );
  const studentCount = Object.keys(studentStatus).reduce(
    (result, key) => result + studentStatus[key].current,
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
          <Box height={{ xs: undefined, sm: 300 }}>
            <StatsCard>
              <Stack
                divider={
                  <Divider
                    flexItem
                    orientation={
                      useMediaQuery(theme.breakpoints.down("sm"))
                        ? "vertical"
                        : "horizontal"
                    }
                  />
                }
                spacing={1}
                justifyContent="space-around"
                height="100%"
                direction={{ xs: "row", sm: "column" }}
              >
                <LastUpdate />
                <StudentCount count={studentCount} />
                <EvaluationPointSummary
                  evaluationPoint={evaluationPoint}
                  students={studentCount}
                />
              </Stack>
            </StatsCard>
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={5}>
          <Box height={300}>
            <StatsCard>
              <LevelStudentChart
                levelStudent={levelStudents}
                studentCount={studentCount}
                maxLevel={maxLevel}
              />
            </StatsCard>
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={5}>
          <Box height={300}>
            <StatsCard>
              <SurvivalRateChart studentStatus={studentStatus} />
            </StatsCard>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        mb={2}
      >
        {beginAtList
          .filter((beginAt) => studentStatus[beginAt].current)
          .map((beginAt) => (
            <Grid item xs={2} sm={2.6} md={3} key={beginAt}>
              <StatsCard>
                <LevelPieChart
                  beginAt={beginAt}
                  levels={levelBeginAtCurrent[beginAt]}
                />
              </StatsCard>
            </Grid>
          ))}
      </Grid>
      <StatsCard>
        <FutureStudentCount studentStatus={studentStatus} />
      </StatsCard>
      <StatsCard>
        <BeginAtLevelTable levelBeginAt={levelBeginAtAll} maxLevel={maxLevel} />
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
