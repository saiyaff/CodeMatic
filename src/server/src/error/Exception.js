export default class Exception extends Error {
  /**
   * Custom Exception constructor
   * @param {string} errorCode - Application-specific error code
   * @param {number} statusCode - HTTP status code (defaults to 500)
   * @param {Array} formatValuesArray - Optional formatting values
   * @param {Object} config - Configuration object with error messages
   * @param {Object} helpersUtil - Utility object with formatting functions
   */
  constructor(errorCode = 'E0000', statusCode = 500, formatValuesArray = [], config, helpersUtil) {
    const message = helpersUtil.stringFormat(config.errors[errorCode], formatValuesArray);
    super(message);

    this.name = errorCode;
    this.httpStatusCode = statusCode;
    this.stack = new Error().stack;
  }
}
