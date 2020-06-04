/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import logger from '../../../common/winston';

class AuthRepository {
  async signin(data) {
    try {
      const { emailAddress } = data;
      const token = await this.signToken(emailAddress);
      return { success: true, token };
    } catch (err) {
      logger.debug(err);
      throw new Error('login failed');
    }
  }

  async signToken(emailAddress) {
    const jwtPayload = { emailAddress };
    const token = await jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
    return token;
  }

  async verifyToken(token) {
    return jwt.verify(token, 'JWT_SECRET');
  }

  async isAuthorized(authorization) {
    const token = authorization.split(' ')[1];
    try {
      await this.verifyToken(token);
      return { authorized: true };
    } catch (err) {
      logger.debug(err);
      throw new Error('Unauthorized');
    }
  }
}

export default AuthRepository;
