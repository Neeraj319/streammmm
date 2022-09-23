import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export class ErrorHandler {
  private error: PrismaClientKnownRequestError;

  public constructor(error: PrismaClientKnownRequestError) {
    this.error = error;
  }

  public checkInstance() {
    if (!(this.error instanceof PrismaClientKnownRequestError)) {
      throw this.error;
    }
    return this;
  }
  public checkErrorCode(errorCode: string) {
    if (this.error.code !== errorCode) {
      throw this.error;
    }
    return this;
  }
  public raiseCustomError(message: string) {
    throw new Error(message);
  }
}
