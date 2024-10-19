import { type ClientRequestOptions, hc } from "hono/client";
import type { AppRoutes } from "./types";

export function createClient(baseUrl: string, options?: ClientRequestOptions) {
  return hc<AppRoutes>(baseUrl, options);
}
