import NextAuth from "next-auth/next";
import FortyTwoProvider, {
  FortyTwoProfile,
} from "next-auth/providers/42-school";
import { getEnv } from "../../../utils/getEnv";

export default NextAuth({
  providers: [
    FortyTwoProvider({
      clientId: getEnv("FT_CLIENT_ID"),
      clientSecret: getEnv("FT_CLIENT_SECRET"),
      profile(profile: FortyTwoProfile) {
        return {
          id: profile.login,
          image: profile.image_url
            ? profile.image_url.replace("users/", "users/small_")
            : null,
        };
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // 1 day
    updateAge: 2 * 60 * 60, // 2 hours
  },
});
