/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import logger from '../../../common/winston';

/**
 * Class AuthRepository
 */
class AuthRepository {
  /**
   * Function for handling signin and return token to user
   * @param {Object} data - An object with properties { emailAddress: string, password: string }
   * @returns {Object} -
   * If successful returns an object with properties { success: boolean, token: string },
   * else throws an Error
   */
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

  /**
   * Function to sign authorization token
   * @param {String} emailAddress
   * @returns {String} - Signed token string
   */
  async signToken(emailAddress) {
    const jwtPayload = { emailAddress };
    const token = await jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: '2 days' });
    return token;
  }

  /**
   * Function for verifying authorization token
   * @param {String} token - authorization token
   * @returns {undefined || JsonWebTokenError} -
   *  Returns undefined for valid tokens, JsonWebTokenError for invalid tokens
   */
  async verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
  }

  /**
   * Function for authenticating api requests
   * @param {String} authorization - authorization header 'Bearer Token'
   * @returns {Object} - Object with property { authorized: boolean }
   */
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
