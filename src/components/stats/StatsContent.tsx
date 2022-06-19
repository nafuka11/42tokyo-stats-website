import dynamic from "next/dynamic";
import { Box, Container, Grid } from "@mui/material";
import EvaluationPointSummary from "./EvaluationPointSummary";
import StatsCard from "./StatsCard";
import LastUpdate from "./LastUpdate";
import FutureStudentCount from "./FutureStudentCount";
import { Contents } from "../../types/Contents";
import { getBeginAtTotal } from "../../services/pick-contents";
import BeginAtLevelTable from "./BeginAtLevelTable";
import StudentTransitionContent from "./StudentTransitionContent";

const LevelStudentChart = dynamic(() => import("./LevelStudentChart"), {
  ssr: false,
});

const SurvivalRateChart = dynamic(() => import("./SurvivalRateChart"), {
  ssr: false,
});

const LevelPieChart = dynamic(() => import("./LevelPieChart"), {
  ssr: false,
});

type Props = {
  contents: Contents;
};

const StatsContent = (props: Props) => {
  const { contents } = props;

  const currentStudentCount =
    contents.currentStudents[contents.beginAtList.length][
      contents.maxLevel + 1
    ];
  const allStudentCount =
    contents.allStudents[contents.beginAtList.length][contents.maxLevel + 1] -
    contents.allStudents
      .filter((_, i) => contents.futureStudentIndexes.includes(i))
      .reduce((prev, v) => prev + v[v.length - 1], 0);
  const weeklyStudents = contents.weeklyData.map((v) => {
    const count =
      v.currentStudents[v.currentStudents.length - 1][
        v.currentStudents[0].length - 1
      ];
    const updatedAt = new Date(v.updatedAt);
    return { count, updatedAt };
  });
  weeklyStudents.push({
    count:
      contents.currentStudents[contents.currentStudents.length - 1][
        contents.currentStudents[0].length - 1
      ],
    updatedAt: new Date(contents.updatedAt),
  });

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
              <StudentTransitionContent weeklyStudents={weeklyStudents} />
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
        <Grid item xs={2} sm={2.6} md={3} minHeight={200}>
          <StatsCard>
            <EvaluationPointSummary
              evaluationPoint={contents.evaluationPointSum}
              students={currentStudentCount}
            />
          </StatsCard>
        </Grid>
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

export default StatsContent;
