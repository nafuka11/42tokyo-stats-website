import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextHeadSeo from "next-head-seo";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MenuBar from "../components/common/MenuBar";
import { theme } from "../styles/theme";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <NextHeadSeo
          title="42Tokyo Stats"
          description="42Tokyoの統計情報を表示するWebサイト"
          og={{ type: "website" }}
        />
        <CssBaseline />
        <MenuBar />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
