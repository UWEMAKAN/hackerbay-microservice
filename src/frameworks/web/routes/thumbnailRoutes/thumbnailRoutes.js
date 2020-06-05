import express from 'express';
import thumbnailController from '../../../../controllers/thumbnailController/thumbnailController';

/**
 * router function for /thumbnail routes
 * @param {Object} dependencies project dependencies
 * @returns {Function} Returns a router
 */
const router = (dependencies) => {
  const thumbnailRouter = express.Router();
  const controller = thumbnailController(dependencies);

  thumbnailRouter.route('/')
    .post(controller.generateThumbnail);
  return thumbnailRouter;
};

export default router;
