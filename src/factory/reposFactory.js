import imageThumbnail from 'image-thumbnail';
import AuthRepository from '../frameworks/repositories/authRepository/authRepository';
import JsonPatchRepository from '../frameworks/repositories/jsonPatchRepository/jsonPatchRepository';
import ThumbnailRepository from '../frameworks/repositories/thumbnailRepository/thumbnailRepository';

/**
 * Factory function for initializing Repositories
 * @returns {Object} Returns an object containing project dependencies
 */
const reposFactory = () => ({
  AuthRepo: new AuthRepository(),
  JsonPatchRepo: new JsonPatchRepository(),
  ThumbnailRepo: new ThumbnailRepository(imageThumbnail)
});

export default reposFactory();
