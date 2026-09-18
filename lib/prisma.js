import { PrismaClient } from "@prisma/client";

// Next.js hot-reloads modules in dev, which would otherwise open a new pool on
// every edit until Neon refuses connections. Reuse one client per process.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
