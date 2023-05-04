import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    _prismaClient?: PrismaClient;
  };

  if (!globalWithPrisma._prismaClient) {
    globalWithPrisma._prismaClient = new PrismaClient();
  }

  prisma = globalWithPrisma._prismaClient;
}

export default prisma;
