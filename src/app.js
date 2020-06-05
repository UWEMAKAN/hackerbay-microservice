import http from 'http';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import logger from './common/winston';
import config from './config/appConfig';
import factory from './factory/reposFactory';
import authRoutes from './frameworks/web/routes/authRoutes/authRoutes';
import routes from './frameworks/web/routes/index';
import authorization from './frameworks/web/middlewares/authorization/authorization';

const app = express();
config(app);

const PORT = process.env.PORT || 4000;
const requireAuth = authorization(factory);

app.use('/auth', authRoutes(factory));
app.use('/api/v1', requireAuth, routes(factory));
app.get('/', (req, res) => res.send('Up and Running'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.all('*', (req, res) => {
  res.status(404);
  return res.send('Ooops! Not Found!!!');
});

export const server = http.createServer(app);
server.listen(PORT, () => {
  logger.debug(`Listening on port ${PORT}`);
});

export default app;
