import JsonPatchRepository from './jsonPatchRepository';

const Repo = new JsonPatchRepository();
const document = {
  firstName: 'Daniel',
  contactDetails: {
    phoneNumbers: []
  }
};
const patch = [
  { op: 'replace', path: '/firstName', value: 'Test' },
  { op: 'add', path: '/lastName', value: 'Test' },
  { op: 'add', path: '/contactDetails/phoneNumbers/0', value: { number: '+2348080897830' } }
];
const inValidPatch = [
  { op: 'replace', path: '/firstName', value: 'Test' },
  { op: 'add', path: 'lastName', value: 'Test' },
  { op: 'add', path: '/contactDetails/phoneNumbers/0', value: { number: '+2348080897830' } }
];
const data = { document, patch };

describe('Testing validate method of the JsonPatchRepository', () => {
  it('should return undefined if patch and operations are valid', async (done) => {
    expect.assertions(1);
    const response = await Repo.validate(patch, document);
    expect(response).toBe(undefined);
    done();
  });

  it('should return throw Error', async (done) => {
    expect.assertions(1);
    const response = await Repo.validate(inValidPatch, document);
    expect(response).toBeInstanceOf(Error);
    done();
  });
});

describe('Testing patch method of the JsonPatchRepository', () => {
  it('should return object with properties firstName: string, lastName: string, contactDetails: Object', async (done) => {
    expect.assertions(2);
    const response = await Repo.patch(data);
    expect(response).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      contactDetails: expect.any(Object)
    });
    expect(response.contactDetails).toMatchObject({
      phoneNumbers: expect.any(Array)
    });
    done();
  });

  it('should throw Error("json patch operation failed")', async (done) => {
    expect.assertions(2);
    try {
      await Repo.patch({ document, inValidPatch });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toStrictEqual(Error('patch operation failed'));
    } finally {
      done();
    }
  });
});
