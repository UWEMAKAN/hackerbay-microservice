import request from 'supertest';
import { server } from './app';

describe('Server Ok status', () => {
  afterEach(() => {
    server.close();
  });
  test('expect / to return 200', async (done) => {
    expect.assertions(1);
    const response = await request(server)
      .get('/');
    expect(response.status).toEqual(200);
    done();
  });
});

describe('Testing all else /*', () => {
  afterEach(() => {
    server.close();
  });
  test('expect /all-else to return status 404', async (done) => {
    expect.assertions(1);
    const response = await request(server)
      .get('/all-else');
    expect(response.status).toEqual(404);
    done();
  });
});
