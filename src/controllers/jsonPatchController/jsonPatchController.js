/* eslint-disable consistent-return */
import jsonPatch from '../../application/useCases/jsonPatch/jsonPatch';
import ErrorHandler from '../../common/ErrorHandler';

const controller = (dependencies) => {
  const { JsonPatchRepo } = dependencies;

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
