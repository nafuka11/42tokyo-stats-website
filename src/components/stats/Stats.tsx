import { CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import StatsContent from "./StatsContent";
import { Contents } from "../../types/Contents";

const Stats = () => {
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

  return <StatsContent contents={contents} />;
};

export default Stats;
