/* eslint-disable consistent-return */
import genThumbnail from '../../application/useCases/generateThumbnail/generateThumbnail';
import ErrorHandler from '../../common/ErrorHandler';

const controller = (dependencies) => {
  const { ThumbnailRepo } = dependencies;

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
