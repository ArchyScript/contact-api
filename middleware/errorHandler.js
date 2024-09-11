const { errorConstants } = require("../constants/errorConstants");



// errorHandler.js
const errorHandler = (err, req, res, next) => {
  // Set default status code to 500 (Internal Server Error)
  const statusCode = err.statusCode || errorConstants.INTERNAL_SERVER_ERROR;

  // Determine the error title based on the status code
  const errorTitle = Object.keys(errorConstants.ERROR_TITLES).includes(statusCode.toString())
    ? errorConstants.ERROR_TITLES[statusCode]
    : errorConstants.ERROR_TITLES.INTERNAL_SERVER_ERROR;

  // Log the error (optional but useful for debugging)
  console.error(err.stack);

  // Send error response
  res.status(statusCode).json({
    success: false, statusCode,
    title: errorTitle,
    message: err.message || errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler; 