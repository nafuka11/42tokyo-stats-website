import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import MenuBar from "../components/common/MenuBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MenuBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
