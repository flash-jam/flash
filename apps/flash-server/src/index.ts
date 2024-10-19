import { configureOpenApi } from "./lib/configure-openapi";
import { createApi } from "./lib/create-api";
import createApp from "./lib/create-app";

const app = createApp();

configureOpenApi(app);

export const routes = createApi(app);

export default app;
