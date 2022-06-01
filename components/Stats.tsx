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
import { getLevelStudents } from "../libs/process-cursus-users";
import LevelStudentChart from "../components/LevelStudentChart";
import StudentCount from "../components/StudentCount";
import SurvivalRateChart from "../components/SurvivalRateChart";
import EvaluationPointSummary from "../components/EvaluationPointSummary";
import FutureStudentCount from "../components/FutureStudentCount";
import StatsCard from "../components/StatsCard";
import BeginAtLevelTable from "../components/BeginAtLevelTable";
import LastUpdate from "../components/LastUpdate";
import { StudentStatusData } from "../types/StudentStatusData";
import { LevelBeginAtData } from "../types/LevelBeginAtData";

const LevelPieChart = dynamic(() => import("../components/LevelPieChart"), {
  ssr: false,
});

type Props = {
  beginAtList: string[];
  studentStatus: StudentStatusData;
  evaluationPoint: number;
  levelBeginAtCurrent: LevelBeginAtData;
  levelBeginAtAll: LevelBeginAtData;
};

const Stats = (props: Props) => {
  const {
    beginAtList,
    studentStatus,
    evaluationPoint,
    levelBeginAtCurrent,
    levelBeginAtAll,
  } = props;
  const theme = useTheme();

  const levelStudents = getLevelStudents(levelBeginAtCurrent);
  const maxLevel = Math.max(
    ...Object.keys(levelBeginAtCurrent)
      .map((key) => levelBeginAtCurrent[key].map((lv) => lv.level))
      .flat()
  );
  const currentStudentCount = Object.keys(studentStatus).reduce(
    (result, key) => result + studentStatus[key].current,
    0
  );
  const allStudentCount = Object.keys(studentStatus).reduce(
    (result, key) =>
      result + studentStatus[key].current + studentStatus[key].blackholed,
    0
  );

  return (
    <Container sx={{ pt: 2, pb: 2 }}>
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
                <StudentCount
                  current={currentStudentCount}
                  all={allStudentCount}
                />
                <EvaluationPointSummary
                  evaluationPoint={evaluationPoint}
                  students={currentStudentCount}
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
                studentCount={currentStudentCount}
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
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={{ xs: 2, md: 3 }}
        sx={{ justifyContent: "space-between" }}
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
      <Box mb={2}>
        <StatsCard>
          <FutureStudentCount studentStatus={studentStatus} />
        </StatsCard>
      </Box>
      <StatsCard>
        <BeginAtLevelTable
          current={levelBeginAtCurrent}
          all={levelBeginAtAll}
          maxLevel={maxLevel}
        />
      </StatsCard>
    </Container>
  );
};

export default Stats;
