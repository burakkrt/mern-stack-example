const _enum = require('../config/enum');
const CustomError = require('./Error');

class Response {
  constructor() {}

  static successResponse(data, statusCode = 200) {
    return {
      statusCode,
      data,
    };
  }

  static errorResponse(error) {
    if (error instanceof CustomError) {
      return {
        statusCode: error.code,
        error: {
          message: error.message,
          description: error.description,
        },
      };
    } else {
      return {
        statusCode: _enum.HTTP_CODES.INT_SERVER_ERROR,
        error: {
          message: 'Unknown Error!',
          description: error.description,
        },
      };
    }
  }
}

module.exports = Response;
