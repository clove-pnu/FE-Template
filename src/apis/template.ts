import { GetSpec, UploadImage } from '../utils/type';
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

export async function getSpec({ repoName, imageName }: GetSpec) {
  return templateInstance.get(`./spec/${repoName}/${imageName}`);
}
