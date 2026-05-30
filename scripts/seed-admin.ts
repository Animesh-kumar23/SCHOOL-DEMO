/**
 * Seeds (or updates) the first admin user.
 *
 *   npm run seed:admin
 *
 * Requires in .env.local:
 *   MONGODB_URI, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, (optional) SEED_ADMIN_NAME
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "../models/User";

// Minimal .env.local loader so we don't pull in an extra dependency.
function loadEnv(file = ".env.local") {
  try {
    const content = readFileSync(resolve(process.cwd(), file), "utf8");
    for (const rawLine of content.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    // file is optional if env vars are already present
  }
}

async function main() {
  loadEnv();

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (add it to .env.local)");

  const email = (process.env.SEED_ADMIN_EMAIL ?? "").toLowerCase().trim();
  const password = process.env.SEED_ADMIN_PASSWORD ?? "";
  const name = process.env.SEED_ADMIN_NAME ?? "Administrator";

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local"
    );
  }

  await mongoose.connect(uri);

  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await User.findOne({ email });

  if (existing) {
    existing.name = name;
    existing.passwordHash = passwordHash;
    existing.role = "superadmin";
    await existing.save();
    console.log(`✓ Updated existing admin: ${email}`);
  } else {
    await User.create({ email, name, passwordHash, role: "superadmin" });
    console.log(`✓ Created superadmin: ${email}`);
  }

  await mongoose.disconnect();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
