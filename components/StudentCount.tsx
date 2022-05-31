import { Box, Typography } from "@mui/material";

type Props = {
  current: number;
  all: number;
};

const StudentCount = (props: Props) => {
  const { current, all } = props;

  return (
    <Box>
      <Typography>在籍学生数</Typography>
      <Typography variant="h5" display="inline">
        {current}
      </Typography>
      <Typography display="inline" variant="caption">
        {" "}
        /{all}
      </Typography>
    </Box>
  );
};

export default StudentCount;
