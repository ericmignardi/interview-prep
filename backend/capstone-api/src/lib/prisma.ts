import { PrismaClient } from '@prisma/client';

// Singleton pattern — prevents exhausting DB connections in development
// (ts-node-dev hot-reloads the module on every file change)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
