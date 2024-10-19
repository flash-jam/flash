import * as HTTPStatusPhrases from "stoker/http-status-phrases";
import createMessageObjectSchema from "stoker/openapi/schemas/create-message-object";

export const notFoundSchema = createMessageObjectSchema(HTTPStatusPhrases.NOT_FOUND);

export const unauthorizedSchema = createMessageObjectSchema(HTTPStatusPhrases.UNAUTHORIZED);
