import * as awilix from 'awilix';
import express from 'express';
import underscore from 'underscore';
import q from 'q';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';

import * as constants from './utils/constants.js';
import config from './config/Configuration.js';

import HelpersUtil from './utils/helpersUtil.js';
import CrossOriginMW from './middleware/CrossOriginMW.js';

import ChatController from './api/chat/ChatController.js';

import ExceptionFactory from './error/ExceptionFactory.js';
import Exception from './error/Exception.js';

import ChatService from './services/ChatService.js';
import LLMService from './services/LLMService.js';

import BaseRepository from './repository/BaseRepository.js';
import ChatRepository from './repository/ChatRepository.js';
import createRouter from "./api/router.js";

// Create IoC container
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  // In dependency injection (DI), "injection mode" refers to how a container resolves and
  // provides dependencies to a class or function. The two main modes are PROXY (default) and CLASSIC.
  // CLASSIC mode analyzes the class's constructor parameters to determine dependencies, potentially
  // leading to faster resolution time, while PROXY uses a proxy object to inject dependencies.
});

// MongoDB setup
mongoose.Promise = global.Promise;
mongoose.connect(config.DB.mongodb.codematics.connection, {}).then(r => {});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Swagger setup
console.log('Initializing Swagger API documentation...');
const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'RESTful Web Services for CodeMatics',
    version: '1.0.0',
    description: 'Documentation for CodeMatics',
  },
  host: 'localhost:3001',
  basePath: '/v1/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['dist/api/**/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Register dependencies
console.log('Registering dependencies...');
container.register({
  // Libraries
  q: awilix.asValue(q),
  express: awilix.asValue(express),
  underscore: awilix.asValue(underscore),
  config: awilix.asValue(config),
  constants: awilix.asValue(constants),
  swaggerSpec: awilix.asValue(swaggerSpec),
  mongoose: awilix.asValue(mongoose),

  // Utilities
  helpersUtil: awilix.asClass(HelpersUtil).singleton(),

  // Middleware
  crossOriginMW: awilix.asClass(CrossOriginMW).singleton(),

  // Controllers
  chatController: awilix.asClass(ChatController).singleton(),

  // Services
  chatService: awilix.asClass(ChatService).singleton(),
  llmService: awilix.asClass(LLMService).singleton(),

  // Factories
  exceptionFactory: awilix.asClass(ExceptionFactory).singleton(),
  exception: awilix.asClass(Exception).singleton(),

  // Repositories
  baseRepository: awilix.asClass(BaseRepository).singleton(),
  chatRepository: awilix.asClass(ChatRepository).singleton(),

  // Router
  router: awilix.asFunction(createRouter).singleton(),
});

export default container;
