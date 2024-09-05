import { UploadImage } from '../utils/type';
import { templateInstance } from './instance';

export async function getImageList() {
  return templateInstance.get('/list');
}

export async function uploadImage({ gitUrl, imageName, spec }: UploadImage) {
  return templateInstance.post('./upload', {
    git_url: gitUrl,
    image_name: imageName,
    spec,
  });
}
