import express from 'express';
import authController from '../../../../controllers/authController/authController';

const router = (dependencies) => {
  const authRouter = express.Router();
  const controller = authController(dependencies);

  authRouter.route('/login')
    .post(controller.login);
  return authRouter;
};

export default router;
