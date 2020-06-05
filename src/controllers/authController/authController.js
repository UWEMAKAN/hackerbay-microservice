/* eslint-disable consistent-return */
import Login from '../../application/auth/login';
import ErrorHandler from '../../common/ErrorHandler';

/**
 * Controller for handling authentication requests
 * @param {Object} dependencies - An object containing project dependencies as properties
 * @returns {Object} - An object with property login: Function
 */
const controller = (dependencies) => {
  const { AuthRepo } = dependencies;

  /**
   * Function for handling request to /login
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function to execute when this function is done
   * @returns {Object} - Response from the operation
   */
  async function login(req, res, next) {
    const LoginUserCommand = Login(AuthRepo);
    const { emailAddress, password } = req.body;
    const data = { emailAddress, password };
    try {
      const response = await LoginUserCommand.Execute(data);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      ErrorHandler(err, req, res, next);
    }
  }

  return {
    login
  };
};

export default controller;
