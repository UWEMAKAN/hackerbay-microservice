import jsonPatchController from './jsonPatchController';

const JsonPatchRepository = {
  patch: jest.fn().mockReturnValue({
    firstName: 'Test',
    lastName: 'Test',
    phoneNumbers: [
      { number: '+2348080897830' }
    ]
  })
};
const dependencies = {
  JsonPatchRepo: JsonPatchRepository
};
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
const next = jest.fn();
const req = {
  body: { document, patch },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};
const res = {
  json: jest.fn().mockReturnValue({
    firstName: 'Test',
    lastName: 'Test',
    contactDetails: {
      phoneNumbers: [
        { number: '+2348080897830' }
      ]
    }
  }),
  locals: {}
};

describe('Testing jsonPatch controller', () => {
  it('should return an object with property patchJson', () => {
    expect.assertions(1);
    expect(jsonPatchController(dependencies)).toMatchObject({
      patchJson: expect.any(Function)
    });
  });
});

describe('Testing patchJson function', () => {
  const controller = jsonPatchController(dependencies);
  it('should patch json and return the patch document', async (done) => {
    expect.assertions(3);
    const response = await controller.patchJson(req, res, next);
    expect(response).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      contactDetails: expect.any(Object)
    });
    expect(res.json).toHaveBeenCalled();
    expect(JsonPatchRepository.patch).toHaveBeenCalled();
    done();
  });

  it('should throw Error', async (done) => {
    expect.assertions(1);
    try {
      expect(await controller.patchJson(
        { ...req, body: { document: undefined, patch: undefined } }, res, next
      )).toThrowError();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      done();
    }
  });
});
