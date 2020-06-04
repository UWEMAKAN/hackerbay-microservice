import jsonpatch from './jsonPatch';

const PatchRepository = {
  patch: jest.fn().mockReturnValue({
    firstName: 'Test',
    lastName: 'Test',
    contactDetails: {
      phoneNumbers: [
        { number: '+2348080897830' }
      ]
    }
  })
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
const data = { document, patch };

describe('Testing jsonPatch use case', () => {
  it('should return an object with property Execute: Function', () => {
    expect.assertions(1);
    expect(jsonpatch(PatchRepository)).toMatchObject({
      Execute: expect.any(Function)
    });
  });

  it('should throw Error("validation failed")', async (done) => {
    const { Execute } = jsonpatch(PatchRepository);
    expect.assertions(2);
    try {
      await Execute({ document: undefined, patch: undefined });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toStrictEqual(Error('validation failed'));
    } finally {
      done();
    }
  });

  it('should return patched json document', async (done) => {
    const { Execute } = jsonpatch(PatchRepository);
    expect.assertions(2);
    const response = await Execute(data);
    expect(response).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      contactDetails: expect.any(Object)
    });
    expect(PatchRepository.patch).toHaveBeenCalled();
    done();
  });
});
