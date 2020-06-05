/* eslint-disable consistent-return */
import genThumbnail from '../../application/useCases/generateThumbnail/generateThumbnail';
import ErrorHandler from '../../common/ErrorHandler';

/**
 * Controller for handling thumbnail generation requests
 * @param {Object} dependencies - An object containing project dependencies as properties
 * @returns {Object} - An object with property generateThumbnail: Function
 */
const controller = (dependencies) => {
  const { ThumbnailRepo } = dependencies;

  /**
   * Function for handling requests to /thumbnail
   * @param {Object} req Request object
   * @param {Object} res Response Object
   * @param {Object} next Next function to execute after this function is done
   * @returns {Object} Returns json object
   */
  async function generateThumbnail(req, res, next) {
    const generateThumbnailCommand = genThumbnail(ThumbnailRepo);
    const { uri, responseType } = req.body;
    const data = { uri, responseType };
    try {
      const response = await generateThumbnailCommand.Execute(data);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      ErrorHandler(err, req, res, next);
    }
  }

  return { generateThumbnail };
};

export default controller;
