const mainErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errMsg = err.message || 'Internal Server Error'

  res.status(statusCode).send({
    message:errMsg,
    status:statusCode
  });
};

export { mainErrorHandler };
