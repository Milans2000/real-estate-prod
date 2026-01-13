import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

function toPascalCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// PostGIS insert for Location
async function insertLocationData(locations: any[]) {
  for (const loc of locations) {
    const { id, country, city, state, address, postalCode, coordinates } = loc;
    try {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Location" 
        ("id", "country", "city", "state", "address", "postalCode", "coordinates")
        VALUES (
          ${id}, '${country}', '${city}', '${state}', '${address}', '${postalCode}',
          ST_GeomFromText('${coordinates}', 4326)
        );
      `);
      console.log(`Inserted location for ${city}`);
    } catch (err) {
      console.error(`Error inserting location for ${city}:`, err);
    }
  }
}

// Delete all data
async function deleteAllData(orderedFiles: string[]) {
  const modelNames = orderedFiles.map((f) =>
    toPascalCase(path.basename(f, path.extname(f)))
  );

  for (const modelName of modelNames.reverse()) {
    const model = (prisma as any)[toCamelCase(modelName)];
    if (!model) continue;
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (err) {
      console.error(`Error clearing data from ${modelName}:`, err);
    }
  }
}

async function main() {
  const dataDir = path.join(__dirname, "seedData");
  const orderedFiles = [
    "location.json",
    "manager.json",
    "property.json",
    "tenant.json",
    "lease.json",
    "application.json",
    "payment.json",
  ];

  // Clear old data
  await deleteAllData(orderedFiles);

  // Seed new data
  for (const fileName of orderedFiles) {
    const filePath = path.join(dataDir, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = toPascalCase(path.basename(fileName, path.extname(fileName)));

    if (modelName === "Location") {
      await insertLocationData(jsonData);
    } else {
      const model = (prisma as any)[toCamelCase(modelName)];
      for (const item of jsonData) {
        await model.create({ data: item });
      }
      console.log(`Seeded ${modelName}`);
    }

    await sleep(500);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
