import express from 'express';
import bodyParser from 'body-parser';
import * as constants from './utils/constants.js';
import container from './ConfigIoc.js';

const app = express();

// Middleware
app.use(bodyParser.json({ limit: `${constants.REQUEST_LIMIT_KB}kb` }));
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
const crossOriginMW = container.resolve('crossOriginMW');
app.use(crossOriginMW.middleware.bind(crossOriginMW));

// Base routes
app.use('/', container.resolve('router'));

// 404 handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = constants.NOT_FOUND;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || constants.INTERNAL_SERVER_ERROR).json({
    code: err.name || 'InternalServerError',
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;
