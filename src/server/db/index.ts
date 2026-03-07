// Database client (server-only)
// Replace with your ORM of choice (e.g. Prisma, Drizzle)
// Example with Prisma:
//
// import { PrismaClient } from "@prisma/client";
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
//
// export const db =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query"] : [],
//   });
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export const db = null; // placeholder — wire up your ORM here
