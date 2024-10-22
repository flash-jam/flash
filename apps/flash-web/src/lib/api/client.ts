import { createClient } from "@flash/server";

const apiBase = import.meta.env.VITE_API_BASE || "";
console.log("apiBase:", { apiBase });
export const client = createClient(apiBase, {
  init: { credentials: "include" },
});
