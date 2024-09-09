import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "@padelverse/server";

export const trpc = createTRPCReact<AppRouter>();
