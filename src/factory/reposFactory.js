import AuthRepository from '../frameworks/repositories/authRepository/authRepository';
import JsonPatchRepository from '../frameworks/repositories/jsonPatchRepository/jsonPatchRepository';

const reposFactory = () => ({
  AuthRepo: new AuthRepository(),
  JsonPatchRepo: new JsonPatchRepository()
});

export default reposFactory();
