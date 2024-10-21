import * as routes from "./profiles.routes";
import * as handlers from "./profiles.handlers";
import { createRouter } from "../../lib/create-app";

const profiles = createRouter()
  .openapi(routes.createProfile, handlers.createProfile)
  .openapi(routes.getProfileForUser, handlers.getProfileForUser)
  .openapi(routes.updateProfile, handlers.updateProfile);

export default profiles;
