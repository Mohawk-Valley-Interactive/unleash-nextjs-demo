import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// Decided to go with the conditional statement methodology as described:
// https://nextjs.org/docs/pages/building-your-application/routing/middleware#conditional-statements
// export const config = {
// 	matcher: ["/api/auth/me"]
// }
export async function middleware(req: NextRequest, res: NextResponse) {
  populateRequestData(req);
  if (req.nextUrl.pathname.endsWith("menu")) {
  }
  if (req.nextUrl.pathname.startsWith("/api/users/me")) {
    return authTokenVerification(req);
  }
}

async function populateRequestData(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");
  const token = bearerToken?.split(" ")[1] ?? "";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  let verified = token.length > 0;
  try {
    if (verified) {
      await jose.jwtVerify(token, secret);
    }
  } catch (e) {
    verified = false;
  }

  if (verified) {
    const tokenPayload = jose.decodeJwt(token) as { email: string };
    req.headers.set("email", tokenPayload.email);
  }

  req.headers.set("bearerToken", bearerToken ?? "");
  req.headers.set("token", token ?? "");
  req.headers.set("verified", verified ? "true" : "false");
}

async function authTokenVerification(req: NextRequest) {
  if (!req.headers.get("bearerToken")) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (no bearer token)." },
      { status: 401 }
    );
  }

  if (!req.headers.get("token")) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (bearer token empty)." },
      { status: 401 }
    );
  }

  if (!req.headers.get("verified")) {
    return NextResponse.json(
      {
        errorMessage: "Unauthorized request (bearer token cannot be verified).",
      },
      { status: 401 }
    );
  }

  if (!req.headers.get("email")) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request (invalid email info)." },
      { status: 401 }
    );
  }

  const headers = new Headers(req.headers);
  headers.delete("bearerToken");
  headers.delete("token");
  headers.delete("verified");
  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}
