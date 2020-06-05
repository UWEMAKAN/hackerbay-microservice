import express from 'express';
import thumbnailController from '../../../../controllers/thumbnailController/thumbnailController';

const router = (dependencies) => {
  const thumbnailRouter = express.Router();
  const controller = thumbnailController(dependencies);

  thumbnailRouter.route('/')
    .post(controller.generateThumbnail);
  return thumbnailRouter;
};

export default router;
