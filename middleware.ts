import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const privatePaths = ["/"]
    const dynamicPrivatePaths = ["/game/", "/profile/", "/search/", "/stream/", "/videos/"]
    const isPathPrivate = privatePaths.some((path) => pathname === path);

    const verifyRoute = () => {
        return dynamicPrivatePaths.some(path => pathname.startsWith(path))
    }

    const res = NextResponse.next();

    if (isPathPrivate || verifyRoute()) {
        const token = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            const url = new URL(`/login`, req.url);
            return NextResponse.redirect(url);
        } 
    }
    return res;
}
