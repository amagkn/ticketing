import { FieldValidationError, ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return (this.errors as FieldValidationError[]).map((error) => ({
      message: error.msg,
      field: error.path,
    }));
  }
}
