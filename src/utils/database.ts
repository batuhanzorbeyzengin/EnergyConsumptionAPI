import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}
