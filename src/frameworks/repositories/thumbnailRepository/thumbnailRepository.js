/* eslint-disable class-methods-use-this */
import logger from '../../../common/winston';

class ThumbnailRepository {
  constructor(generator) {
    this.generator = generator;
  }

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
