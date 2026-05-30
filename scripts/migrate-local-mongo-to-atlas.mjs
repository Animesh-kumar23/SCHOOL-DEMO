import fs from "node:fs";
import dns from "node:dns";
import { MongoClient } from "mongodb";

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017";
const DEFAULT_LOCAL_DB = "school";
const BATCH_SIZE = 500;

function readAtlasUri() {
  const env = fs.readFileSync(".env.local", "utf8");
  const line = env
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith("MONGODB_URI="));

  if (!line) {
    throw new Error("MONGODB_URI is missing from .env.local");
  }

  return line
    .slice(line.indexOf("=") + 1)
    .trim()
    .replace(/^["']|["']$/g, "");
}

function readFlag(name, fallback) {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

async function collectionCounts(db) {
  const collections = await db.listCollections().toArray();
  const counts = {};

  for (const collection of collections) {
    counts[collection.name] = await db.collection(collection.name).countDocuments();
  }

  return counts;
}

function printCounts(label, counts) {
  console.log(label);

  const entries = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length === 0) {
    console.log("  (no collections)");
    return;
  }

  for (const [name, count] of entries) {
    console.log(`  ${name}: ${count}`);
  }
}

async function copyIndexes(sourceCollection, targetCollection) {
  const indexes = await sourceCollection.listIndexes().toArray();

  for (const index of indexes) {
    if (index.name === "_id_") continue;

    const { key, name, v, ns, ...options } = index;
    await targetCollection.createIndex(key, options);
  }
}

async function migrateCollection(sourceCollection, targetCollection) {
  let copied = 0;
  let batch = [];
  const cursor = sourceCollection.find({}, { batchSize: BATCH_SIZE });

  for await (const document of cursor) {
    batch.push({
      replaceOne: {
        filter: { _id: document._id },
        replacement: document,
        upsert: true,
      },
    });

    if (batch.length >= BATCH_SIZE) {
      const result = await targetCollection.bulkWrite(batch, { ordered: false });
      copied += result.upsertedCount + result.modifiedCount + result.matchedCount;
      batch = [];
    }
  }

  if (batch.length > 0) {
    const result = await targetCollection.bulkWrite(batch, { ordered: false });
    copied += result.upsertedCount + result.modifiedCount + result.matchedCount;
  }

  await copyIndexes(sourceCollection, targetCollection);
  return copied;
}

async function main() {
  const localUri = readFlag("localUri", process.env.LOCAL_MONGODB_URI ?? DEFAULT_LOCAL_URI);
  const localDbName = readFlag("localDb", process.env.LOCAL_MONGODB_DB ?? DEFAULT_LOCAL_DB);
  const atlasUri = readAtlasUri();
  const dropFirst = process.argv.includes("--drop");

  if (atlasUri.startsWith("mongodb+srv://")) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }

  const localClient = new MongoClient(localUri);
  const atlasClient = new MongoClient(atlasUri, { serverSelectionTimeoutMS: 30000 });

  await localClient.connect();
  await atlasClient.connect();

  const sourceDb = localClient.db(localDbName);
  const targetDb = atlasClient.db();
  const collections = await sourceDb.listCollections().toArray();

  console.log(`Source: ${localUri}/${sourceDb.databaseName}`);
  console.log(`Target: Atlas/${targetDb.databaseName}`);
  printCounts("Before target counts:", await collectionCounts(targetDb));

  for (const collection of collections) {
    const sourceCollection = sourceDb.collection(collection.name);
    const targetCollection = targetDb.collection(collection.name);

    if (dropFirst) {
      await targetCollection.drop().catch((error) => {
        if (error.codeName !== "NamespaceNotFound") throw error;
      });
    }

    const copied = await migrateCollection(sourceCollection, targetCollection);
    console.log(`Copied ${collection.name}: ${copied}`);
  }

  printCounts("After target counts:", await collectionCounts(targetDb));

  await localClient.close();
  await atlasClient.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
