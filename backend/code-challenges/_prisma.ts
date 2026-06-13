// Minimal Prisma mock for type-checking backend challenges without a real DB.
// Real Prisma needs `npx prisma generate` — for the code-challenge stubs, this
// gives you the same shape so tsc passes.
//
// When you work on the actual backend capstone, you'll use the real @prisma/client.

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  used: number;
  limit: number;
  createdAt: Date;
}

export interface File {
  id: string;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
}

export interface UserDelegate {
  findUnique(args: {
    where: { id?: string; email?: string };
    select?: Partial<Record<keyof User, boolean>>;
  }): Promise<Partial<User> | null>;
  create(args: { data: Omit<User, 'id' | 'createdAt'> }): Promise<User>;
  update(args: {
    where: { id: string };
    data: Partial<Omit<User, 'id' | 'createdAt'>>;
  }): Promise<User>;
}

export interface FileDelegate {
  findMany(args?: {
    skip?: number;
    take?: number;
    orderBy?: Partial<Record<keyof File, 'asc' | 'desc'>>;
    where?: Partial<File>;
  }): Promise<File[]>;
  count(args?: { where?: Partial<File> }): Promise<number>;
  create(args: { data: Omit<File, 'id' | 'createdAt'> }): Promise<File>;
  delete(args: { where: { id: string } }): Promise<File>;
}

export interface PrismaClientLike {
  user: UserDelegate;
  file: FileDelegate;
  $transaction<T>(fn: (tx: PrismaClientLike) => Promise<T>): Promise<T>;
}

// In your challenge files, import and use this type for `prisma`:
// import type { PrismaClientLike } from './_prisma';
// declare const prisma: PrismaClientLike;
export declare const prisma: PrismaClientLike;
