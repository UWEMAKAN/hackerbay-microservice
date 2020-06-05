/**
 * Use case function for handling json patch operation
 * @param {Object} PatchRepository - Repository object for performing jsonpatch related operations
 * @returns {Object} - Returns an object with property Execute: Function
 */
const patch = (PatchRepository) => {
  /**
   * Handles validation, executes json patch operation, and returns results
   * @param {Object} data - An object with properties { document, patch }
   * @returns {Object} - An object containing results (patched document) from the operation
   */
  async function Execute(data) {
    if (!data.document || !data.patch) {
      throw new Error('validation failed');
    }
    const response = await PatchRepository.patch(data);
    return response;
  }
  return { Execute };
};

export default patch;
