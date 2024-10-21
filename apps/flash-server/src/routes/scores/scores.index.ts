import { createRouter } from "../../lib/create-app";
import * as routes from "./scores.routes";
import * as handlers from "./scores.handlers";

export const scores = createRouter()
  .openapi(routes.createScore, handlers.createScore)
  .openapi(routes.getScoreForUser, handlers.getScoreForUser)
  .openapi(routes.saveScore, handlers.saveScore)
  .openapi(routes.addScore, handlers.addScore)
  .openapi(routes.resetScore, handlers.resetScore);
