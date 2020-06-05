/* eslint-disable consistent-return */
import jsonPatch from '../../application/useCases/jsonPatch/jsonPatch';
import ErrorHandler from '../../common/ErrorHandler';

/**
 * Controller for handling json patch requests
 * @param {Object} dependencies - An object containing project dependencies as properties
 * @returns {Object} - An object with property patchJson: Function
 */
const controller = (dependencies) => {
  const { JsonPatchRepo } = dependencies;

  /**
   * Function for handling requests to /jsonpatch
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function to execute when this function is done
   */
  async function patchJson(req, res, next) {
    const JsonPatchCommand = jsonPatch(JsonPatchRepo);
    const { document, patch } = req.body;
    const data = { document, patch };
    try {
      const response = await JsonPatchCommand.Execute(data);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      ErrorHandler(err, req, res, next);
    }
  }

  return { patchJson };
};

export default controller;
