import winston from "../utils/winston.utils.js";

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  const errors = error.errors || {};

  req.logger = winston;
  req.logger.ERROR( `${req.method} ${req.url} . ${new Date().toLocaleTimeString()} ${error}`)
  res.status(statusCode).json({ error: errorMessage, errors: errors });
}
  
  export default errorHandler;