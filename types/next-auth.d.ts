import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user:    User;
        expires: string;
    }

    interface User {
        name:  string;
        email: string;
        image: string;
        token: string;
        id:    string;
        }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        name: string;
        email: string;
        picture: string;
        sub: number;
        accessToken: string;
        userName: string;
        accessTokenExpires: number;
        id: number;
        iat: number;
        exp: number;
        jti: string;
    }
}
