"use client";

interface SaveResult {
  ok: boolean;
  data?: any;
  error?: string;
  details?: unknown;
}

/** Create (POST) or update (PATCH) a resource through its API route. */
export async function saveResource(
  basePath: string,
  id: string | undefined,
  values: unknown
): Promise<SaveResult> {
  const url = id ? `${basePath}/${id}` : basePath;
  let res: Response;
  try {
    res = await fetch(url, {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    return { ok: false, error: "Network error. Is the server running?" };
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return {
      ok: false,
      error: data?.error ?? "Save failed",
      details: data?.details,
    };
  }
  return { ok: true, data };
}

export async function deleteResource(
  basePath: string,
  id: string
): Promise<SaveResult> {
  let res: Response;
  try {
    res = await fetch(`${basePath}/${id}`, { method: "DELETE" });
  } catch {
    return { ok: false, error: "Network error" };
  }
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    return { ok: false, error: data?.error ?? "Delete failed" };
  }
  return { ok: true };
}
