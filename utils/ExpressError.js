class ExpressError extends Error {
  constructor(message, statusCode) {
    super(); // Error constructor
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
