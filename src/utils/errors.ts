/**
 * BusinessError
 */
export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}
