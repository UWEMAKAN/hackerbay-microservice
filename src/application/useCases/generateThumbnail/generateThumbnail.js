const thumbnail = (ThumbnailRepo) => {
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
