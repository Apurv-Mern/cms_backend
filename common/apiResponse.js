// apiResponse.js

// Function to send success response
exports.apiSuccessResponse = function (res, statusCode, data, message) {
  const response = {
    success: true,

    statusCode: statusCode,
    data: data,
    message: message,
  };
  res.status(statusCode || 200).json(response);
};

// Function to send error response
exports.apiErrorResponse = function (res, statusCode, message) {
  const response = {
    success: false,
    message: message,
    statusCode: statusCode,
  };
  res.status(statusCode || 500).json(response);
};
