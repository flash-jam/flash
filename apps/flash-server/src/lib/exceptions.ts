import { HTTPException } from "hono/http-exception";
import * as HTTPStatusCodes from "stoker/http-status-codes";

export class UnauthorizedException extends HTTPException {
  constructor(message?: string) {
    super(HTTPStatusCodes.UNAUTHORIZED, { message: message || undefined });
  }
}

export class InvalidAuthException extends HTTPException {
  constructor() {
    super(HTTPStatusCodes.INTERNAL_SERVER_ERROR, { message: "getValidAuth called outside of `auth()` middleware" });
  }
}
