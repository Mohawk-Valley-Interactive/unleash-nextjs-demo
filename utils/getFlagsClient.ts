import { NextRequest } from "next/server";
import {
  Context,
  IVariant,
  evaluateFlags,
  flagsClient,
  getDefinitions,
  randomSessionId,
} from "@unleash/nextjs";

export async function getFlagsClient(req: NextRequest): Promise<{
  isEnabled: (name: string) => boolean;
  getVariant: (name: string) => IVariant;
}> {
  const UNLEASH_COOKIE_NAME = "unleash-session-id";

  const sessionId =
    req.nextUrl.searchParams.get("sessionId") ||
    req.cookies.get(UNLEASH_COOKIE_NAME)?.value ||
    randomSessionId();
  const remoteAddress =
    req.nextUrl.searchParams.get("remoteAddress") ||
    req.headers.get("x-forwarded-for") ||
    req.ip;

  const context: Context = {
    userId: req.nextUrl.searchParams.get("userId") || undefined,
    sessionId,
    remoteAddress,
  };

  const definitions = await getDefinitions();
  const { toggles } = await evaluateFlags(definitions, context);

  return flagsClient(toggles);
}
