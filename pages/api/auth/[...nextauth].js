import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch";
import { LOGIN_URL } from "../../../lib/twitch";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: 'vdad16o4rb91nnzy9bnawjqqprhan6',
      clientSecret: 'x8wp1ayix527lhe9zinnzaikdp1ffs',
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,  
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user }){
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          username: account.providerAccountId,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID");
        return token;
      }
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.username = token.username;

      return session;
    }
  },
})