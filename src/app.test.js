import request from 'supertest';
import { server } from './app';

describe('Server Ok status', () => {
  afterEach(() => {
    server.close();
  });
  it('should return status code 200 for /', async (done) => {
    expect.assertions(1);
    const response = await request(server)
      .get('/');
    expect(response.status).toEqual(200);
    done();
  });
});

describe('Testing /docs route', () => {
  afterEach(() => {
    server.close();
  });
  it('should return status code 200 for /docs', async (done) => {
    expect.assertions(1);
    const response = await request(server)
      .get('/docs');
    expect(response.status).toEqual(301);
    done();
  });
});

describe('Testing all else /*', () => {
  afterEach(() => {
    server.close();
  });
  it('should return status 404 for /all-else', async (done) => {
    expect.assertions(1);
    const response = await request(server)
      .get('/all-else');
    expect(response.status).toEqual(404);
    done();
  });
});
