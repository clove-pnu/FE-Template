import { GetSpec, UploadImage } from '../utils/type';
import { poolInstance, templateInstance } from './instance';

interface CreateTemplateParams {
  name: string;
  images: string[];
  portVals: [number, string][][];
  envVals: [string, string][][];
}

export async function getImageList() {
  return poolInstance.get('/list');
}

export async function uploadImage({ gitUrl, imageName, spec }: UploadImage) {
  return poolInstance.post('./upload', {
    git_url: gitUrl,
    image_name: imageName,
    spec,
  });
}

export async function getSpec({ repoName, imageName }: GetSpec) {
  return poolInstance.get(`./spec/${repoName}/${imageName}`);
}

export async function getTemplateList() {
  return templateInstance.get('/list');
}

export async function getTemplateDetail({ item }: { item: string }) {
  return templateInstance.get(`/get/${item}`);
}

export async function createTemplate({
  name,
  images,
  portVals,
  envVals,
}: CreateTemplateParams) {
  return templateInstance.post('/create', {
    name,
    images,
    port_vals: portVals,
    env_vals: [],
    volume_mount_vals: [],
    volume_vals: [],
  });
}

export async function deleteTempalte({ item }: { item: string }) {
  return templateInstance.delete(`/delete/${item}`);
}
