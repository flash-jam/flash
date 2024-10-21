import { createRouter } from "../../lib/create-app";
import * as routes from "./scores.routes";
import * as handlers from "./scores.handlers";

export const scores = createRouter()
  .openapi(routes.createScore, handlers.createScore)
  .openapi(routes.getScoreForUser, handlers.getScoreForUser)
  .openapi(routes.createScore, handlers.createScore);
