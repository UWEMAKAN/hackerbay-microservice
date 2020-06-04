import express from 'express';
import jsonPatchRoutes from './jsonPatchRoutes/jsonPatchRoutes';

const apiRouter = (dependencies) => {
  const routes = express.Router();

  const jsonPatchRouter = jsonPatchRoutes(dependencies);

  routes.use('/jsonpatch', jsonPatchRouter);

  return routes;
};

export default apiRouter;
