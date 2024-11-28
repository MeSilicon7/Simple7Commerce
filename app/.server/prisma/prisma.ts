import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client/web";
import { TURSO_URL, TURSO_AUTH_TOKEN } from "~/env";

const libsql = createClient({
  url: TURSO_URL,
  authToken: TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);
export const prisma = new PrismaClient({ adapter });
