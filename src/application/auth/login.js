/**
 * Login authentication function
 * @param {Object} AuthRepository
 * @returns {Object}
 */
const login = (AuthRepository) => {
  /**
   * Execute
   * @param {Object} data -0 { username, password } fields for sigin authentication
   * @returns {Object}
   */
  async function Execute(data) {
    if (
      !data.emailAddress || !data.password
    ) {
      throw new Error('validation failed');
    }

    const response = await AuthRepository.signin(data);
    return response;
  }

  return {
    Execute
  };
};

export default login;
