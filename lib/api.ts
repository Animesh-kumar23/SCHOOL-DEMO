import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

/** Returns the session for an authenticated admin, or null. */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  return session ?? null;
}

export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function badRequest(details: unknown) {
  return NextResponse.json(
    { error: "Validation failed", details },
    { status: 400 }
  );
}

export function notFound() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export function serverError(message = "Something went wrong") {
  return NextResponse.json({ error: message }, { status: 500 });
}
