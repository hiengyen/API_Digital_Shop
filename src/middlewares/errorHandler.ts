import express, { ErrorRequestHandler, NextFunction } from 'express'

const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction,
) => {
  const statusCode: number = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: error.stack, // display bug location
    message: error.message || 'Internal Server Error',
  })
}

export default errorHandler
