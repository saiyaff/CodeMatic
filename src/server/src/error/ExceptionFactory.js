// import Exception from 'Exception';

export default class ExceptionFactory {
  constructor(config, helpersUtil) {
    this.config = config;
    this.helpersUtil = helpersUtil;
  }

  /**
   * Creates an Exception instance with provided error code, HTTP status, and format values.
   * @param {string} errorCode - Custom error code.
   * @param {number} [httpStatusCode=500] - Optional HTTP status code (default 500).
   * @param {Array} [formatValuesArray=[]] - Optional values for message formatting.
   * @returns {Exception} - Formatted custom error instance.
   */
  createInstance(errorCode, httpStatusCode = 500, formatValuesArray = []) {
    return new Exception(
      errorCode,
      httpStatusCode,
      formatValuesArray,
      this.config,
      this.helpersUtil
    );
  }
}
/**
 * ExceptionFactory class to create custom exceptions.
 * It uses the Exception class to format errors based on provided parameters.
 */
