/* eslint-disable class-methods-use-this */
import * as jsonpatch from 'fast-json-patch';
import logger from '../../../common/winston';

class JsonPatchRepository {
  async validate(patch, document) {
    return jsonpatch.validate(patch, document);
  }

  async patch(data) {
    const { document, patch } = data;
    try {
      const isInvalid = await this.validate(patch, document);
      if (!isInvalid) {
        return jsonpatch.applyPatch(document, patch).newDocument;
      }
      throw new Error('invalid patch operation');
    } catch (err) {
      logger.debug(err);
      throw new Error('json patch operation failed');
    }
  }
}

export default JsonPatchRepository;
