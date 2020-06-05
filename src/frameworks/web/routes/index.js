import express from 'express';
import jsonPatchRoutes from './jsonPatchRoutes/jsonPatchRoutes';
import thumbnailRoutes from './thumbnailRoutes/thumbnailRoutes';

/**
 * api router function
 * @param {Object} dependencies project dependencies
 * @returns {Function} api routes
 */
const apiRouter = (dependencies) => {
  const routes = express.Router();

  const jsonPatchRouter = jsonPatchRoutes(dependencies);
  const thumbnailRouter = thumbnailRoutes(dependencies);

  routes.use('/jsonpatch', jsonPatchRouter);
  routes.use('/thumbnail', thumbnailRouter);

  return routes;
};

export default apiRouter;
