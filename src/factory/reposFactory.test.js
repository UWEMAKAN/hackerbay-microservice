import reposFactory from './reposFactory';

test('should return an object', () => {
  expect.assertions(1);
  expect(reposFactory).toMatchObject({
    AuthRepo: expect.any(Object),
    JsonPatchRepo: expect.any(Object),
    ThumbnailRepo: expect.any(Object)
  });
});
