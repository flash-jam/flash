import { apiReference } from "@scalar/hono-api-reference";

import packageJSON from "../../package.json";
import type { AppOpenAPI } from "./types";

export function configureOpenApi(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      layout: "modern",
      spec: {
        url: "/doc",
      },
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
    })
  );
}
