import thumbnail from './generateThumbnail';

const ThumbnailRepo = {
  generateThumbnail: jest.fn().mockReturnValue({ thumbnail: 'a' })
};
const uri = 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg';

describe('Testing the thumbnail generation use case', () => {
  it('should return an object with property Execute: Function', () => {
    expect.assertions(1);
    expect(thumbnail(ThumbnailRepo)).toMatchObject({
      Execute: expect.any(Function)
    });
  });

  it('should return image thumbnail in the specified responseType', async (done) => {
    const { Execute } = thumbnail(ThumbnailRepo);
    const responseType = 'base64';
    const data = { uri, responseType };
    expect.assertions(1);
    const response = await Execute(data);
    expect(response).toMatchObject({
      thumbnail: expect.any(String)
    });
    done();
  });

  it('should throw Error("validation failed")', async (done) => {
    const { Execute } = thumbnail(ThumbnailRepo);
    expect.assertions(2);
    try {
      await Execute({ uri });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toStrictEqual(Error('validation failed'));
    } finally {
      done();
    }
  });
});
