import auth from './authorization';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJ1d2VtYWthbkBnbWFpbC5jb20iLCJpYXQiOjE1OTEyMzIzOTIsImV4cCI6MTU5MTQwNTE5Mn0.ClowGABjer0jsJQG9VRfc02MA4R0doSqB_27JTGheCQ';
const AuthRepository = {
  isAuthorized: jest.fn().mockReturnValue({ authorized: true })
};
const dependencies = {
  AuthRepo: AuthRepository
};
const next = jest.fn();
const req = {
  headers: {
    authorization: `Bearer ${token}`
  },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};
const res = {
  json: jest.fn().mockReturnValue({ success: true, token }),
  locals: {}
};

describe('Testing auth function', () => {
  it('should return a function', () => {
    expect.assertions(1);
    const requireAuth = auth(dependencies);
    expect(requireAuth).toBeInstanceOf(Function);
  });
});

describe('Testing requireAuth middleware function', () => {
  const requireAuth = auth(dependencies);
  it('should call next if authorized', async (done) => {
    expect.assertions(2);
    await requireAuth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(AuthRepository.isAuthorized).toHaveBeenCalled();
    done();
  });

  it('should throw Error if authorization headers is not set', async (done) => {
    expect.assertions(1);
    const authorization = '';
    try {
      expect(await requireAuth({ ...req, headers: { authorization } }, res, next)).toThrow();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      done();
    }
  });
});
