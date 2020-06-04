import AuthRepository from '../frameworks/repositories/authRepository/authRepository';

const reposFactory = () => ({
  AuthRepo: new AuthRepository()
});

export default reposFactory();
