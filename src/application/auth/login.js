/**
 * Function for handling login authentication
 * @param {Object} AuthRepository - Repository object for performing Auth related operations
 * @returns {Object} - Returns an object with property Execute: Function
 */
const login = (AuthRepository) => {
  /**
   * Handles input validation, executes login operation, and returns credentials
   * @param {Object} data - An object with properties { username, password }
   * @returns {Object} - Returns an object containing credentials for subsequent requests
   */
  async function Execute(data) {
    if (!data.emailAddress || !data.password) {
      throw new Error('validation failed');
    }

    const response = await AuthRepository.signin(data);
    return response;
  }

  return { Execute };
};

export default login;
