import fs from "node:fs";
import { MongoClient } from "mongodb";

function readMongoUri() {
  const env = fs.readFileSync(".env.local", "utf8");
  const line = env
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith("MONGODB_URI="));

  if (!line) throw new Error("MONGODB_URI is missing from .env.local");

  let value = line.slice(line.indexOf("=") + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return value;
}

const facultyPhotos = [
  {
    name: "Anubhav Kumar",
    photo: "/rr/faculty-anubhav-kumar.jpeg",
  },
  {
    name: "Priyanshu Kumar",
    photo: "/rr/faculty-priyanshu-kumar.jpeg",
  },
];

async function main() {
  const client = new MongoClient(readMongoUri());
  await client.connect();

  const faculties = client.db().collection("faculties");

  for (const member of facultyPhotos) {
    const result = await faculties.updateOne(
      { name: member.name },
      { $set: { photo: member.photo, updatedAt: new Date() } }
    );

    console.log(
      `${member.name}: ${result.matchedCount ? "updated" : "not found"}`
    );
  }

  const maxOrder = await faculties
    .find({})
    .sort({ order: -1 })
    .limit(1)
    .next();

  const priyanka = await faculties.updateOne(
    { name: "Priyanka Kumari" },
    {
      $set: {
        name: "Priyanka Kumari",
        designation: "Teacher",
        department: "",
        photo: "/rr/faculty-priyanka-kumari.jpeg",
        qualifications: "",
        bio: "",
        updatedAt: new Date(),
      },
      $setOnInsert: {
        order: typeof maxOrder?.order === "number" ? maxOrder.order + 1 : 0,
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );

  console.log(
    `Priyanka Kumari: ${priyanka.upsertedCount ? "created" : "updated"}`
  );

  const docs = await faculties
    .find(
      {
        name: { $in: ["Anubhav Kumar", "Priyanka Kumari", "Priyanshu Kumar"] },
      },
      {
        projection: {
          _id: 0,
          name: 1,
          designation: 1,
          department: 1,
          photo: 1,
          qualifications: 1,
          order: 1,
        },
      }
    )
    .sort({ order: 1 })
    .toArray();

  console.table(docs);
  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
