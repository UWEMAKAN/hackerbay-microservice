/**
 * Use case function for handling thumbnail generation
 * @param {Object} ThumbnailRepo - Repository object for performing thumbnail related operations
 * @returns {Object} - Returns an object with property Execute: Function
 */
const thumbnail = (ThumbnailRepo) => {
  /**
   * Handles validation, executes thumbnail generation operation, and returns results
   * @param {Object} data - An object with properties { uri, responseType }
   * @returns {Object} - An object containing results (thumbnail) from the operation
   */
  async function Execute(data) {
    if (!data.uri || !data.responseType) {
      throw new Error('validation failed');
    }
    const height = 50;
    const width = 50;
    const response = await ThumbnailRepo.generateThumbnail(data, width, height);
    return response;
  }

  return { Execute };
};

export default thumbnail;
