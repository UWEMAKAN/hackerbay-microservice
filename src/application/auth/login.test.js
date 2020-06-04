import login from './login';

const AuthRepository = {
  signin: jest.fn().mockReturnValue({ success: true, token: 'Token' })
};

describe('Testing login function', () => {
  it('should return an object with property Execute: Function', () => {
    expect.assertions(1);
    const func = login(AuthRepository);
    expect(func).toMatchObject({
      Execute: expect.any(Function)
    });
  });

  it('should throw validation error', async (done) => {
    const data = {};
    const { Execute } = login(AuthRepository);
    expect.assertions(2);
    try {
      await Execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toStrictEqual(Error('validation failed'));
    } finally {
      done();
    }
  });

  it('should return object with properties success: boolean, token: string', async () => {
    const data = { emailAddress: 'test@test.com', password: 'test' };
    const { Execute } = login(AuthRepository);
    expect.assertions(2);
    const response = await Execute(data);
    expect(response).toMatchObject({
      success: expect.any(Boolean),
      token: expect.any(String)
    });
    expect(AuthRepository.signin).toHaveBeenCalled();
  });
});
