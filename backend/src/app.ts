import express from 'express';
import morganLogger from 'morgan';
import corsMiddleware from 'cors';
import cookieParserMiddleware from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';

import { handleError, handleNotFound } from './middlewares/middlewares';
import { MONGODB_URI, ORIGIN_URL } from './constants';
import { client as elastic_search_client } from './services/elasticsearch/elasticsearch.service';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

elastic_search_client
  .ping()
  .then(() => {
    console.log('Elasticsearch connected');
  })
  .catch((err: any) => {
    console.log('Elasticsearch unavailable', { error: err });
  });

const expressApp = express();
expressApp.use(morganLogger('dev'));
expressApp.use(
  corsMiddleware({
    origin: ORIGIN_URL,
    credentials: true,
  }),
);
expressApp.use(express.json());
expressApp.use(cookieParserMiddleware());

// Define root route
expressApp.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// ElasticSearch Index setup
import { setupIndex } from './services/elasticsearch/user.elasticsearch';

setupIndex();

// Importing API routes
import apiRoutes from './route';

expressApp.use('/api', apiRoutes);

// Custom Middleware
// Handle invalid routes
expressApp.use(handleNotFound);

// Handle errors
expressApp.use(handleError);

export default expressApp;
