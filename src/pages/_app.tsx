import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NextHeadSeo from "next-head-seo";
import MenuBar from "../components/common/MenuBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextHeadSeo
        title="42Tokyo Stats"
        description="42Tokyoの統計情報を表示するWebサイト"
        canonical={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`}
        og={{ type: "website" }}
      />
      <MenuBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
