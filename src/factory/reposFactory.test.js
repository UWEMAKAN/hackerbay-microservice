import reposFactory from './reposFactory';

test('should return an object', () => {
  expect.assertions(2);
  expect(typeof reposFactory).toBe('object');
  expect(reposFactory).toHaveProperty('AuthRepo');
});
