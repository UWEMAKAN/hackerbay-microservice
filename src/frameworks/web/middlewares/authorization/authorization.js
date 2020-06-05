/* eslint-disable consistent-return */
import ErrorHandler from '../../../../common/ErrorHandler';

/**
 * Function for creating authorization middleware
 * @param {Object} dependencies - project dependencies with property AuthRepo
 * @returns {Function} Returns middleware function
 */
const auth = (dependencies) => {
  const { AuthRepo } = dependencies;
  /**
   * Middleware function for authenticating requests and checking authorization headers
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {Function} next Next function to call when this function is done
   * @returns {Function | Error} calls next or an throws Error
   */
  async function requireAuth(req, res, next) {
    const { authorization } = req.headers;
    try {
      if (authorization) {
        await AuthRepo.isAuthorized(authorization);
        return next();
      }
      throw new Error('Unauthorized');
    } catch (err) {
      err.status = 400;
      ErrorHandler(err, req, res, next);
    }
  }

  return requireAuth;
};

export default auth;
