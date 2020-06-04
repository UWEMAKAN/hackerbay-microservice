const patch = (PatchRepository) => {
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
