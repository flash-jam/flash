import { createClient } from "@flash/server";

export const client = createClient("", { init: { credentials: "include" } });
