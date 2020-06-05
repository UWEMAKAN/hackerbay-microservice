import express from 'express';
import jsonPatchController from '../../../../controllers/jsonPatchController/jsonPatchController';

/**
 * router function for /jsonpatch routes
 * @param {Object} dependencies project dependencies
 * @returns {Function} Returns a router
 */
const router = (dependencies) => {
  const jsonPatchRouter = express.Router();
  const controller = jsonPatchController(dependencies);

  jsonPatchRouter.route('/')
    .patch(controller.patchJson);
  return jsonPatchRouter;
};

export default router;
