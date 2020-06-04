import AuthRepository from './authRepository';

const Repo = new AuthRepository();
const data = { emailAddress: 'test@test.com', password: 'test' };

describe('Testing AuthRepository methods', () => {
  describe('Testing siginin method', () => {
    it('should return an object with properties success: boolean and token: string', async (done) => {
      expect.assertions(1);
      const response = await Repo.signin(data);
      expect(response).toMatchObject({
        success: expect.any(Boolean),
        token: expect.any(String)
      });
      done();
    });
    it('should throw Error', async (done) => {
      expect.assertions(2);
      try {
        await Repo.signin();
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err).toStrictEqual(Error('login failed'));
      } finally {
        done();
      }
    });
  });

  describe('Testing signToken method', () => {
    it('should return a token string', async (done) => {
      const { emailAddress } = data;
      expect.assertions(1);
      const token = await Repo.signToken(emailAddress);
      expect(typeof token).toBe('string');
      done();
    });
  });

  describe('Testing verifyToken method', () => {
    it('should return an object with properties emailAddress: string, iat: number, exp: number', async (done) => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJ1d2VtYWthbkBnbWFpbC5jb20iLCJpYXQiOjE1OTEyMzIzOTIsImV4cCI6MTU5MTQwNTE5Mn0.ClowGABjer0jsJQG9VRfc02MA4R0doSqB_27JTGheCQ';
      expect.assertions(1);
      const verified = await Repo.verifyToken(token);
      expect(verified).toMatchObject({
        emailAddress: expect.any(String),
        iat: expect.any(Number),
        exp: expect.any(Number)
      });
      done();
    });
  });

  describe('Testing isAuthorized method', () => {
    it('should return return object with properties authorized: boolean', async (done) => {
      const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJ1d2VtYWthbkBnbWFpbC5jb20iLCJpYXQiOjE1OTEyMzIzOTIsImV4cCI6MTU5MTQwNTE5Mn0.ClowGABjer0jsJQG9VRfc02MA4R0doSqB_27JTGheCQ';
      expect.assertions(1);
      const authorized = await Repo.isAuthorized(authorization);
      expect(authorized).toMatchObject({
        authorized: expect.any(Boolean)
      });
      done();
    });

    it('should throw Error', async (done) => {
      const authorization = 'Bearer Token';
      expect.assertions(2);
      try {
        await Repo.isAuthorized(authorization);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err).toStrictEqual(Error('Unauthorized'));
      } finally {
        done();
      }
    });
  });
});
