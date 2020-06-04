import authController from './authController';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJ1d2VtYWthbkBnbWFpbC5jb20iLCJpYXQiOjE1OTEyMzIzOTIsImV4cCI6MTU5MTQwNTE5Mn0.ClowGABjer0jsJQG9VRfc02MA4R0doSqB_27JTGheCQ';
const AuthRepository = {
  signin: jest.fn().mockReturnValue({ success: true, token })
};
const dependencies = {
  AuthRepo: AuthRepository
};
const next = jest.fn();
const req = {
  body: { emailAddress: 'test@test.com', password: 'test' },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};
const res = {
  json: jest.fn().mockReturnValue({ success: true, token }),
  locals: {}
};

describe('Testing authController', () => {
  it('should return object with property login: function', () => {
    expect.assertions(1);
    const controller = authController(dependencies);
    expect(controller).toMatchObject({
      login: expect.any(Function)
    });
  });
});

describe('Testing login function of authController', () => {
  const controller = authController(dependencies);
  it('should return object with properties success: boolean, token: string', async (done) => {
    expect.assertions(3);
    const response = await controller.login(req, res, next);
    expect(response).toMatchObject({
      success: expect.any(Boolean),
      token: expect.any(String)
    });
    expect(res.json).toHaveBeenCalled();
    expect(AuthRepository.signin).toHaveBeenCalled();
    done();
  });

  it('should throw Error', async (done) => {
    expect.assertions(1);
    try {
      expect(await controller.login({ ...req, body: { emailAddress: '', password: '' } }, res, next)).toThrowError(Error('validation failed'));
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      done();
    }
  });
});
