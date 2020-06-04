/* eslint-disable consistent-return */
import Login from '../../application/auth/login';
import ErrorHandler from '../../common/ErrorHandler';

const controller = (dependencies) => {
  const { AuthRepo } = dependencies;

  async function login(req, res, next) {
    const LoginUserCommand = Login(AuthRepo);
    const data = req.body;
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
