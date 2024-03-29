import NextAuth from "next-auth";
import axios from "axios";

async function refreshAccessToken(token) {
    const baseUrl = "https://id.twitch.tv/oauth2/token?"
    try {     
        const res = await axios.post(`${baseUrl}&grant_type=refresh_token&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&refresh_token=${token.refreshToken}`)
        const refreshedToken = await res.data;

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, 
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        };
  
    } catch(error) {
        console.error(error);
    
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

const scopes = [
    "openid",
    "user:read:email",
    "user:read:follows",
    "user:edit",
    "user:edit:follows",
    "user:read:subscriptions",
    "clips:edit",
    "bits:read",
    "channel:read:hype_train",
    "channel:read:vips",
    "chat:edit",
    "chat:read",
].join(" "); //all the string will be one string separated by space

export default NextAuth({
  // provider configuration
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
                scope: scopes,
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
    secret: process.env.NEXTAUTH_SECRET, 
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
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
                    accessTokenExpires:  account.expires_at * 1000,
                    id: token.sub,
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                console.log("EXISTING ACCESS TOKEN IS VALID");          
                return token;
            }

            // New access token when the access token has expired
            console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {   
            if(token) {
                session.user.token = token.accessToken;
                session.user.name = token.username;
                session.user.id = token.sub;
                session.error = token.error;
            }
            return session;
        },
    },
});