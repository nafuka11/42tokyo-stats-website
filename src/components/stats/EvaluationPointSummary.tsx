import { Box, Typography } from "@mui/material";

type Props = {
  evaluationPoint: number;
  students: number;
};

const EvaluationPointSummary = (props: Props) => {
  const { evaluationPoint, students } = props;
  const perStudent = (evaluationPoint / students).toFixed(2);
  return (
    <Box>
      <Typography>Evaluation point</Typography>
      <Typography variant="h5" display="inline">
        {perStudent}
      </Typography>
      <Typography display="inline"> /人</Typography>
      <Typography variant="caption" display="block">
        合計 {evaluationPoint}
      </Typography>
    </Box>
  );
};

export default EvaluationPointSummary;
