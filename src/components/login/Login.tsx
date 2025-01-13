import { Container, Typography } from "@mui/material";

const Login = () => {
  return (
    <Container
      sx={{
        pt: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1">
        42Tokyo Statsをご利用いただき、ありがとうございます。
        <br />
        このたび、本サイトをクローズすることにいたしました。
        <br />
        理由としましては、データソースとして利用している 42 API
        の利用規約（第4条）を遵守するために、システムの構成そのものを大幅に変更する必要があったからです。
        <br />
        残念ながら十分な時間とモチベーションを確保できず、誠に勝手ながらサイトをクローズする判断に至りました。
        <br />
        これまでご利用いただき、誠にありがとうございました。
        <br />
        <br />
        nfukada
      </Typography>
    </Container>
  );
};

export default Login;
