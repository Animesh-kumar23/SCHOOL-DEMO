import { getSignedUpload } from "@/lib/cloudinary";
import { json, requireAuth, serverError, unauthorized } from "@/lib/api";

/**
 * Returns a short-lived Cloudinary upload signature so the browser can upload
 * directly without the API secret ever reaching the client.
 */
export async function POST() {
  if (!(await requireAuth())) return unauthorized();
  try {
    return json(getSignedUpload());
  } catch {
    return serverError("Cloudinary is not configured");
  }
}
