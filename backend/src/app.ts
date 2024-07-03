import express from 'express';
import morganLogger from 'morgan';
import helmetSecurity from 'helmet';
import corsMiddleware from 'cors';
import cookieParserMiddleware from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';

import { handleError, handleNotFound } from './middlewares/middlewares';
import { MONGODB_URI } from './constants';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const expressApp = express();
expressApp.use(morganLogger('dev'));
expressApp.use(helmetSecurity());
expressApp.use(corsMiddleware());
expressApp.use(express.json());
expressApp.use(cookieParserMiddleware());

// Define root route
expressApp.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Importing API routes
import apiRoutes from './route';

expressApp.use('/api', apiRoutes);

// Custom Middleware
// Handle invalid routes
expressApp.use(handleNotFound);

// Handle errors
expressApp.use(handleError);

export default expressApp;
