import {PrismaClient} from "@prisma/client";
import {getDatabaseUrl} from "./vaultClient"; // implement this method as needed

let prisma: PrismaClient;

export default function getPrismaClient() {
  if (process.env.NODE_ENV === "production") {
    // Use an external method to get the connection string dynamically
    let cachedDbUrl: string | undefined;
    let cachedPrisma: PrismaClient | undefined;

    const currentDbUrl = getDatabaseUrl();
    if (!cachedPrisma || cachedDbUrl !== currentDbUrl) {
      cachedDbUrl = currentDbUrl;
      cachedPrisma = new PrismaClient({
        datasources: {
          db: {
            url: cachedDbUrl,
          },
        },
      });
    }

    prisma = cachedPrisma;
  } else {
    let globalWithPrisma = global as typeof globalThis & {
      _prismaClient?: PrismaClient;
    };

    if (!globalWithPrisma._prismaClient) {
      globalWithPrisma._prismaClient = new PrismaClient();
    }

    prisma = globalWithPrisma._prismaClient;
  }

  return prisma;
}
