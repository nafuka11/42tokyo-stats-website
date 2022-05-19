import { Box, Typography } from "@mui/material";

type Props = {
  count: number;
};

const StudentCount = (props: Props) => {
  const { count } = props;

  return (
    <Box>
      <Typography>学生数</Typography>
      <Typography variant="h5">{count}</Typography>
    </Box>
  );
};

export default StudentCount;
