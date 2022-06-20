import { GetStaticProps, NextPage } from "next";
import StatsContent from "../components/stats/StatsContent";
import { readDemoContents } from "../repositories/local-file";
import { Contents } from "../types/Contents";

type Props = {
  contents: Contents;
};

const DemoPage: NextPage<Props> = (props: Props) => {
  const { contents } = props;

  return <StatsContent contents={contents} />;
};

export const getStaticProps: GetStaticProps = () => {
  const contents = readDemoContents();

  return {
    props: {
      contents,
    },
  };
};

export default DemoPage;
