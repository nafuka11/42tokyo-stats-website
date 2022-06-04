import NextAuth from "next-auth/next";
import FortyTwoProvider from "next-auth/providers/42-school";
import { getEnv } from "../../../utils/getEnv";

export default NextAuth({
  providers: [
    FortyTwoProvider({
      clientId: getEnv("FT_CLIENT_ID"),
      clientSecret: getEnv("FT_CLIENT_SECRET"),
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // 1 day
    updateAge: 2 * 60 * 60, // 2 hours
  },
});
