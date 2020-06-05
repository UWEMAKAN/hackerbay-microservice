import ThumbnailRepository from './thumbnailRepository';

const generator = jest.fn(({ uri }, options) => (uri && options ? 'abc' : Promise.reject(Error('invalid uri or options'))));
const Repo = new ThumbnailRepository(generator);
const uri = 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg';
const responseType = 'base64';

describe('Testing generateThumbnail method of ThumbnailRepository', () => {
  it('should return thumbnail in specified format', async (done) => {
    const data = { uri, responseType };
    const width = 50;
    const height = 50;
    expect.assertions(2);
    const response = await Repo.generateThumbnail(data, width, height);
    expect(response).toMatchObject({
      thumbnail: expect.any(String || Buffer)
    });
    expect(generator).toHaveBeenCalled();
    done();
  });

  it('should throw new Error("")', async (done) => {
    const data = { uri: '', responseType };
    const width = 50;
    const height = 50;
    expect.assertions(2);
    try {
      await Repo.generateThumbnail(data, width, height);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toStrictEqual(Error('generate thumbnail failed'));
    } finally {
      done();
    }
  });
});
