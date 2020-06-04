import express from 'express';
import jsonPatchController from '../../../../controllers/jsonPatchController/jsonPatchController';

const router = (dependencies) => {
  const jsonPatchRouter = express.Router();
  const controller = jsonPatchController(dependencies);

  jsonPatchRouter.route('/')
    .patch(controller.patchJson);
  return jsonPatchRouter;
};

export default router;
