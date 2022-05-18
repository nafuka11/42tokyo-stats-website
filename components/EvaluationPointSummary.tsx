import { Paper, Typography } from "@mui/material";

type Props = {
  evaluationPoint: number;
  students: number;
};

const EvaluationPointSummary = (props: Props) => {
  const { evaluationPoint, students } = props;
  const perStudent = (evaluationPoint / students).toFixed(2);
  return (
    <Paper sx={{ p: 2 }}>
      <Typography>Evaluation point</Typography>
      <Typography variant="h4">{evaluationPoint}</Typography>
      <Typography variant="caption">1人あたり {perStudent}</Typography>
    </Paper>
  );
};

export default EvaluationPointSummary;
