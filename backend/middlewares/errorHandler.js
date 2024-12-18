const errorHandler = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'An unexpected error ocurred' : message,
  });
};

module.exports = errorHandler;
