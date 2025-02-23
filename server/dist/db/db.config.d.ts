import { PrismaClient } from "@prisma/client";
declare const prisma: PrismaClient<{
    log: ("info" | "error" | "query" | "warn")[];
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export default prisma;
