import NextAuth, { Account, DefaultSession, User } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user:    User;
        expires: string;
    }

    interface User {
        name:  string;
        email: string;
        image: string;
        id?:    string;
    }

    interface Token {
        name: string;
        email: string;
        picture: string;
        sub: number;
        accessToken: string;
        userName: string;
        accessTokenExpires?: number;
        id: number;
        iat: number;
        exp: number;
        jti: string;
    }
    
    interface Account {
        provider: string;
        type: string;
        providerAccountId: string;
        access_token: string;
        expires_at: number;
        id_token: string;
        refresh_token: string;
        scope: string;
        token_type: string;
    }

    interface Profile {
        id: number;
        name: string;
        email: string;
        image: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        username: string;
        accessTokenExpires: number;
        id: number;
    }
}
