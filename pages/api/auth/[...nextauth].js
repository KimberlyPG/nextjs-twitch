import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch";
import { LOGIN_URL } from "../../../lib/twitch";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,  
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return{
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: token.name,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID");
        return token;
      }

      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
    },

    async session({ session, token }) {      
      
      session.user.token = token.accessToken;
      session.user.name = token.username;
      session.user.id = token.sub;
      return session;
    },
  },
})