import NextAuth from "next-auth"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      wellKnown: "https://id.twitch.tv/oauth2/.well-known/openid-configuration",
      id: "twitch",
      name: "Twitch",
      type: "oauth",
      authorization: {
        params: {
          scope: "openid user:read:email user:read:follows",
          claims: {
            id_token: {
              email: null,
              picture: null,
              preferred_username: null,
            },
          },
        },
      },
    idToken: true,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.preferred_username,
        email: profile.email,
        image: profile.picture,
      }
    },
    },
  ],
  secret: 'some_super_secret_value',  
  jwt: {
     secret: 'some_super_secret_value',
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        console.log("token", token);
        console.log("account", account);
        console.log("TOKEN", token);
        return{
          ...token,
          accessToken: account.access_token,
          username: token.name,
          accessTokenExpires: account.expires_at * 1000,
          id: token.sub
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID");
        return token;
      }
    },

    async session({ session, token }) {      
      session.user.token = token.accessToken;
      session.user.name = token.username;
      session.user.id = token.sub;
      return session;
    },
  },
});