/* eslint-disable class-methods-use-this */
import logger from '../../../common/winston';

/**
 * class ThumbnailRepository
 */
class ThumbnailRepository {
  /**
   * class constructor
   * @param {Function} generator
   * Function to generate thumbnail by passing uri and options as arguments.
   */
  constructor(generator) {
    this.generator = generator;
  }

  /**
   * Function for generating thumbnail from image
   * @param {Object} data Object with properties { uri: string, responseType: string }.
   * responseType can be base64 or buffer
   * @param {Number} width expected thumbnail width: number
   * @param {Number} height expected thumbnail height: number
   * @returns {Object} Returns object containing thumbnail
   */
  async generateThumbnail(data, width, height) {
    const { uri, responseType } = data;
    const options = { width, height, responseType };
    try {
      const thumbnail = await this.generator({ uri }, options);
      return { thumbnail };
    } catch (err) {
      logger.debug(err);
      throw new Error('generate thumbnail failed');
    }
  }
}

export default ThumbnailRepository;
