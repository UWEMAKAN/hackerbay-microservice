import imageThumbnail from 'image-thumbnail';
import AuthRepository from '../frameworks/repositories/authRepository/authRepository';
import JsonPatchRepository from '../frameworks/repositories/jsonPatchRepository/jsonPatchRepository';
import ThumbnailRepository from '../frameworks/repositories/thumbnailRepository/thumbnailRepository';

const reposFactory = () => ({
  AuthRepo: new AuthRepository(),
  JsonPatchRepo: new JsonPatchRepository(),
  ThumbnailRepo: new ThumbnailRepository(imageThumbnail)
});

export default reposFactory();
