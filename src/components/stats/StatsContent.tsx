import dynamic from "next/dynamic";
import { Box, Container, Grid } from "@mui/material";
import LevelStudentChart from "./charts/LevelStudentChart";
import SurvivalRateChart from "./charts/SurvivalRateChart";
import StatsCard from "./StatsCard";
import LastUpdate from "./LastUpdate";
import FutureStudentTable from "./tables/FutureStudentTable";
import { Contents } from "../../types/Contents";
import {
  getBeginAtTotalArray,
  getStudentTotal,
} from "../../services/pick-contents";
import BeginAtLevelTable from "./tables/BeginAtLevelTable";
import StudentTransitionContent from "./StudentTransitionContent";

const LevelPieChart = dynamic(() => import("./charts/LevelPieChart"), {
  ssr: false,
});

type Props = {
  contents: Contents;
};

const StatsContent = (props: Props) => {
  const { contents } = props;

  const currentStudentCount = getStudentTotal(contents.currentStudents);

  return (
    <Container sx={{ pt: 0.5, pb: 2 }}>
      <Grid container mb={1}>
        <Grid item xs={12} sx={{ pl: 1 }}>
          <LastUpdate updatedAt={contents.updatedAt} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        mb={2}
        justifyContent="center"
      >
        <Grid item xs={4} sm={2} md={4}>
          <Box height={{ xs: 260, sm: 300 }}>
            <StatsCard padding={1}>
              <StudentTransitionContent weeklyData={contents.weeklyData} />
            </StatsCard>
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={4}>
          <Box height={300}>
            <StatsCard padding={1}>
              <LevelStudentChart
                currentStudents={contents.currentStudents}
                studentCount={currentStudentCount}
                maxLevel={contents.maxLevel}
              />
            </StatsCard>
          </Box>
        </Grid>
        <Grid item xs={2} sm={3} md={4}>
          <Box height={300}>
            <StatsCard padding={1}>
              <SurvivalRateChart
                beginAtList={contents.beginAtList}
                allStudents={getBeginAtTotalArray(contents.allStudents)}
                currentStudents={getBeginAtTotalArray(contents.currentStudents)}
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
        mb={2}
      >
        {contents.beginAtList
          .filter((beginAt) => beginAt < contents.updatedAt)
          .map((beginAt, i) => (
            <Grid item xs={2} sm={2.6} md={3} key={beginAt} minHeight={200}>
              <StatsCard padding={1}>
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
          <FutureStudentTable
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

export default StatsContent;
