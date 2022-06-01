import NextAuth from "next-auth/next";
import FortyTwoProvider from "next-auth/providers/42-school";

export default NextAuth({
  providers: [
    FortyTwoProvider({
      clientId: process.env.FT_CLIENT_ID,
      clientSecret: process.env.FT_CLIENT_SECRET
    })
  ],
  session: {
    maxAge: 14 * 24 * 60 * 60, // 14 days
    updateAge: 12 * 60 * 60 // 12 hours
  }
})
