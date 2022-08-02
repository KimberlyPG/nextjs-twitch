import NextAuth from "next-auth"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      clientId: 'vdad16o4rb91nnzy9bnawjqqprhan6',
      clientSecret: 'guyueda45vxywnynlajhowkv2ooggh',
      wellKnown: "https://id.twitch.tv/oauth2/.well-known/openid-configuration",
      id: "twitch",
      name: "Twitch",
      type: "oauth",
      authorization: {
        params: {
          scope: "openid user:read:email",
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
  session: {
    strategy: 'jwt',
  },
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

      return session;
    },
  },
});