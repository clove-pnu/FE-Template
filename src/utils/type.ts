export interface ImageSpec {
  [key: string]: string;
}

export interface UploadImage {
  gitUrl: string;
  imageName: string;
  spec: ImageSpec;
}

export interface GetSpec {
  repoName: string;
  imageName: string;
}
