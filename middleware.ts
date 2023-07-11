import { NextRequest, NextResponse, userAgent } from "next/server";
import * as jose from "jose";

export const config = {
  matcher: ["/api/profile/:slug+"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  return authTokenVerification(req, res);
}

async function authTokenVerification(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization");
  if (!bearerToken) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (no bearer token)." },
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (bearer token empty)." },
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (e) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized request (bearer token cannot be verified).",
      },
      { status: 401 }
    );
  }

  const tokenPayload = jose.decodeJwt(token) as { email: string };

  if (!tokenPayload.email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (invalid email info)." },
      { status: 401 }
    );
  }

  const headers = new Headers(req.headers);
  headers.set("email", tokenPayload.email);

  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}
