import thumbnailController from './thumbnailController';

const ThumbnailRepo = {
  generateThumbnail: jest.fn().mockReturnValue({ thumbnail: 'a' })
};
const dependencies = {
  ThumbnailRepo
};
const uri = 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg';
const responseType = 'base64';
const next = jest.fn();
const req = {
  body: { uri, responseType },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};
const res = {
  json: jest.fn().mockReturnValue({ thumbnail: 'abc' }),
  locals: {}
};

describe('Testing thumbnail controller', () => {
  it('should return object with property generateThumbnail: Function', () => {
    expect.assertions(1);
    expect(thumbnailController(dependencies)).toMatchObject({
      generateThumbnail: expect.any(Function)
    });
  });
});

describe('Testing generateThumbnail function', () => {
  const controller = thumbnailController(dependencies);
  it('should return object with property thumbnail: string | blob', async (done) => {
    expect.assertions(3);
    const response = await controller.generateThumbnail(req, res, next);
    expect(response).toMatchObject({
      thumbnail: expect.any(String)
    });
    expect(ThumbnailRepo.generateThumbnail).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    done();
  });

  it('should throw Error', async (done) => {
    expect.assertions(1);
    try {
      expect(await controller.generateThumbnail(
        { ...req, body: { uri, responseType: '' } }, res, next
      )).toThrowError();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      done();
    }
  });
});
