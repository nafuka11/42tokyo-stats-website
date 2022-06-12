import dynamic from "next/dynamic";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getLevelStudents } from "../../services/process-cursus-users";
import LevelStudentChart from "./LevelStudentChart";
import StudentCount from "./StudentCount";
import SurvivalRateChart from "./SurvivalRateChart";
import EvaluationPointSummary from "./EvaluationPointSummary";
import FutureStudentCount from "./FutureStudentCount";
import StatsCard from "./StatsCard";
import BeginAtLevelTable from "./BeginAtLevelTable";
import LastUpdate from "./LastUpdate";
import { useEffect, useState } from "react";
import { Contents } from "../../types/Contents";

const LevelPieChart = dynamic(() => import("./LevelPieChart"), {
  ssr: false,
});

const Stats = () => {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
  const [contents, setContents] = useState<Contents | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await fetch("/api/contents");
      const data: Contents = await response.json();
      setContents(data);
    };
    fetchContents();
  }, []);

  if (!contents) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  const levelStudents = getLevelStudents(contents.levelBeginAtCurrent);
  const maxLevel = Math.max(
    ...Object.keys(contents.levelBeginAtCurrent)
      .map((key) => contents.levelBeginAtCurrent[key].map((lv) => lv.level))
      .flat()
  );
  const currentStudentCount = Object.keys(contents.studentStatus).reduce(
    (result, key) => result + contents.studentStatus[key].current,
    0
  );
  const allStudentCount = Object.keys(contents.studentStatus).reduce(
    (result, key) =>
      result +
      contents.studentStatus[key].current +
      contents.studentStatus[key].blackholed,
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
                    orientation={isMobileSize ? "vertical" : "horizontal"}
                  />
                }
                spacing={1}
                justifyContent="space-around"
                height="100%"
                direction={{ xs: "row", sm: "column" }}
              >
                <LastUpdate updatedAt={contents.updatedAt} />
                <StudentCount
                  current={currentStudentCount}
                  all={allStudentCount}
                />
                <EvaluationPointSummary
                  evaluationPoint={contents.evaluationPoint}
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
              <SurvivalRateChart studentStatus={contents.studentStatus} />
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
        {contents.beginAtList
          .filter((beginAt) => contents.studentStatus[beginAt].current)
          .map((beginAt) => (
            <Grid item xs={2} sm={2.6} md={3} key={beginAt} minHeight={200}>
              <StatsCard>
                <LevelPieChart
                  beginAt={beginAt}
                  levels={contents.levelBeginAtCurrent[beginAt]}
                />
              </StatsCard>
            </Grid>
          ))}
      </Grid>
      <Box mb={2}>
        <StatsCard>
          <FutureStudentCount studentStatus={contents.studentStatus} />
        </StatsCard>
      </Box>
      <StatsCard>
        <BeginAtLevelTable
          current={contents.levelBeginAtCurrent}
          all={contents.levelBeginAtAll}
          maxLevel={maxLevel}
        />
      </StatsCard>
    </Container>
  );
};

export default Stats;
