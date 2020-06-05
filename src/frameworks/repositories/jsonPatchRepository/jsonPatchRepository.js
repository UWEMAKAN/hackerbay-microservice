/* eslint-disable class-methods-use-this */
import * as jsonpatch from 'fast-json-patch';
import logger from '../../../common/winston';

/**
 * class JsonPatchRepository
 */
class JsonPatchRepository {
  /**
   *
   * @param {Array} patch - A list of patch operations to perform on document
   * @param {Object} document - Json object to be operated on
   * @returns {undefined | JsonPatchError} -
   *   Returns undefined for valid patch operations, or JsonPatchError for invalid patch operations
   */
  async validate(patch, document) {
    return jsonpatch.validate(patch, document);
  }

  /**
   * Function for handling json patch operation
   * @param {Object} data - An object with properties { document: Object, patch: Array }
   * @returns {Object} - If successful, returns patched json document, else throws an Error
   */
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
      throw new Error('patch operation failed');
    }
  }
}

export default JsonPatchRepository;
