import express from 'express';
import authController from '../../../../controllers/authController/authController';

/**
 * router function for /auth routes
 * @param {Object} dependencies project dependencies
 * @returns {Function} Returns a router
 */
const router = (dependencies) => {
  const authRouter = express.Router();
  const controller = authController(dependencies);

  authRouter.route('/login')
    .post(controller.login);
  return authRouter;
};

export default router;
