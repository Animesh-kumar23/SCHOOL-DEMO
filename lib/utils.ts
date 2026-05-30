import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Converts a title into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Deep-clones a Mongoose lean doc into a plain, client-serializable object
 * (ObjectId → string, Date → ISO string). */
export function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/** Formats a date for display, e.g. "29 May 2026". */
export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Returns a YYYY-MM-DD string for <input type="date">; defaults to today. */
export function toDateInputValue(value?: string | Date | number): string {
  const d = value ? new Date(value) : new Date();
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}
