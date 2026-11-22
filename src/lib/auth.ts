import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById } from "./demo-store";
import type { Role, User } from "./types";

const COOKIE_NAME = "taf_session";
const SECRET = process.env.AUTH_SECRET ?? "taf-africa-demo-secret-change-me";

function sign(userId: string) {
  return createHmac("sha256", SECRET).update(userId).digest("base64url");
}

function verify(token: string) {
  const [userId, signature] = token.split(".");
  if (!userId || !signature) return null;
  const expected = Buffer.from(sign(userId));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length) return null;
  return timingSafeEqual(expected, actual) ? userId : null;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const userId = verify(token);
  if (!userId) return null;
  const user = findUserById(userId);
  if (!user || user.banned) return null;
  return user;
}

export async function createSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${userId}.${sign(userId)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  return user;
}

export async function requireRole(role: Role) {
  const user = await requireUser();
  if (user.role !== role && user.role !== "admin") redirect("/tableau-de-bord");
  return user;
}
