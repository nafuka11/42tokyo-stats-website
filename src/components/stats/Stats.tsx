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
import { useEffect, useState } from "react";
import LevelStudentChart from "./LevelStudentChart";
import StudentCount from "./StudentCount";
import SurvivalRateChart from "./SurvivalRateChart";
import EvaluationPointSummary from "./EvaluationPointSummary";
import StatsCard from "./StatsCard";
import LastUpdate from "./LastUpdate";
import FutureStudentCount from "./FutureStudentCount";
import { Contents } from "../../types/Contents";
import { getBeginAtTotal } from "../../services/pick-contents";
import BeginAtLevelTable from "./BeginAtLevelTable";

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

  const currentStudentCount =
    contents.currentStudents[contents.beginAtList.length][
      contents.maxLevel + 1
    ];
  const allStudentCount =
    contents.allStudents[contents.beginAtList.length][contents.maxLevel + 1] -
    contents.allStudents
      .filter((_, i) => contents.futureStudentIndexes.includes(i))
      .reduce((prev, v) => prev + v[v.length - 1], 0);

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
                  evaluationPoint={contents.evaluationPointSum}
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
                currentStudents={contents.currentStudents}
                studentCount={currentStudentCount}
                maxLevel={contents.maxLevel}
              />
            </StatsCard>
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={5}>
          <Box height={300}>
            <StatsCard>
              <SurvivalRateChart
                beginAtList={contents.beginAtList}
                allStudents={getBeginAtTotal(contents.allStudents)}
                currentStudents={getBeginAtTotal(contents.currentStudents)}
                futureStudentIndexes={contents.futureStudentIndexes}
              />
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
          .filter((beginAt) => beginAt < contents.updatedAt)
          .map((beginAt, i) => (
            <Grid item xs={2} sm={2.6} md={3} key={beginAt} minHeight={200}>
              <StatsCard>
                <LevelPieChart
                  beginAt={beginAt}
                  students={contents.currentStudents[i]}
                />
              </StatsCard>
            </Grid>
          ))}
      </Grid>
      <Box mb={2}>
        <StatsCard>
          <FutureStudentCount
            beginAtList={contents.beginAtList}
            allStudents={contents.allStudents}
            futureStudentIndexes={contents.futureStudentIndexes}
          />
        </StatsCard>
      </Box>
      <StatsCard>
        <BeginAtLevelTable
          beginAtList={contents.beginAtList}
          maxLevel={contents.maxLevel}
          allStudents={contents.allStudents}
          currentStudents={contents.currentStudents}
        />
      </StatsCard>
    </Container>
  );
};

export default Stats;
