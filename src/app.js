import http from 'http';
import express from 'express';
import logger from './common/winston';
import config from './config/appConfig';
import factory from './factory/reposFactory';
import authRoutes from './frameworks/web/routes/authRoutes/authRoutes';

const app = express();
config(app);

const PORT = process.env.PORT || 4000;

app.use('/auth', authRoutes(factory));
app.get('/', (req, res) => res.send('Up and Running'));
app.all('*', (req, res) => {
  res.status(404);
  return res.send('Ooops! Not Found!!!');
});

export const server = http.createServer(app);
server.listen(PORT, () => {
  logger.debug(`Listening on port ${PORT}`);
});

export default app;
