import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { findUserByEmail, registerUser } from "@/lib/demo-store";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = request.headers
    .get("cookie")
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("google_oauth_state="))
    ?.split("=")[1];

  if (!clientId || !clientSecret || !code || !state || state !== cookieState) {
    return NextResponse.redirect(new URL("/connexion?error=google-auth", APP_URL));
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${APP_URL}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL("/connexion?error=google-token", APP_URL));
  }
  const token = (await tokenResponse.json()) as { access_token?: string };
  if (!token.access_token) {
    return NextResponse.redirect(new URL("/connexion?error=google-token", APP_URL));
  }

  const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { authorization: `Bearer ${token.access_token}` },
  });
  if (!profileResponse.ok) {
    return NextResponse.redirect(new URL("/connexion?error=google-profile", APP_URL));
  }
  const profile = (await profileResponse.json()) as {
    name?: string;
    email?: string;
  };
  if (!profile.email) {
    return NextResponse.redirect(new URL("/connexion?error=google-profile", APP_URL));
  }

  let user = findUserByEmail(profile.email);
  if (!user) {
    const role = state.split(":")[1] === "freelance" ? "freelance" : "client";
    const result = registerUser({
      name: profile.name ?? profile.email.split("@")[0],
      email: profile.email,
      password: randomUUID(),
      role,
    });
    if (!result.ok) return NextResponse.redirect(new URL("/connexion?error=google-account", APP_URL));
    user = findUserByEmail(profile.email);
  }
  if (!user || user.banned) {
    return NextResponse.redirect(new URL("/connexion?error=google-account", APP_URL));
  }

  await createSession(user.id);
  return NextResponse.redirect(new URL("/tableau-de-bord", APP_URL));
}
