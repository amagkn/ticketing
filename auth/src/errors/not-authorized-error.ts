import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  reason = "Error connecting to database";

  constructor() {
    super("Authorized error");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
