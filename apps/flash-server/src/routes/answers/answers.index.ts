import * as routes from "./answers.routes";
import * as handlers from "./answers.handlers";
import { createRouter } from "../../lib/create-app";

const answers = createRouter()
  .openapi(routes.saveAnswer, handlers.saveAnswers)
  .openapi(routes.getAnswers, handlers.getAnswers)
  .openapi(routes.getAnswer, handlers.getAnswer)
  .openapi(routes.recentAnswers, handlers.recentAnswers)
  .openapi(routes.stats, handlers.stats);

export default answers;
