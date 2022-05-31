import NextAuth from "next-auth/next";
import FortyTwoProvider from "next-auth/providers/42-school";

export default NextAuth({
  providers: [
    FortyTwoProvider({
      clientId: process.env.FT_CLIENT_ID,
      clientSecret: process.env.FT_CLIENT_SECRET
    })
  ]
})
