import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import appRoot from 'app-root-path';
import compression from 'compression';

const config = (app) => {
  const accessLogStream = fs.createWriteStream(`${appRoot}/dist/logs/access.log`, { flags: 'a' });
  morgan.token('time', (tokens, req, res) => {
    let responseTime = `${Math.round(tokens['response-time'](req, res))}`;
    if (responseTime.length < 2) {
      responseTime = `0${responseTime}`;
    }
    return `${responseTime}ms`;
  });
  morgan.token('path', (tokens, req, res) => {
    let requestPath = `${tokens.url(req, res)}`;
    if (requestPath.endsWith('/')) {
      requestPath = requestPath.slice(0, requestPath.length - 1);
    }
    return requestPath;
  });
  morgan.token('agent', (tokens, req, res) => `${tokens['user-agent'](req, res)}`);

  app.use(compression());
  app.use(morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.path(tokens, req, res),
    tokens.status(req, res),
    tokens.time(tokens, req, res),
    tokens.agent(tokens, req, res)
  ].join('\t\t'), {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode === 404 || req.originalUrl === '/'
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
  app.use(express.static(`${appRoot}/dist/public`));
  app.get('/docs', (req, res) => res.render('/docs/index.html'));
};

export default config;
