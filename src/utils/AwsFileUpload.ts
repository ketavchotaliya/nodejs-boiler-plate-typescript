import AWS from 'aws-sdk';
import sharp from 'sharp';
import { logger } from './logger';

class AwsFileUpload {
  private s3Public: any;
  private s3Private: any;
  private publicBucket: any;
  private privateBucket: any;

  constructor() {
    this.s3Public = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
      region: process.env.S3_REGION
    });

    this.s3Private = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
      region: process.env.AWS_PRIVATE_REGION
    });

    this.privateBucket = process.env.S3_PRIVATE_BUCKET_NAME;
    this.publicBucket = process.env.S3_PUBLIC_BUCKET_NAME;
  }

  public async uploadFile(filepath: string, filename: string, filedata: any, isPublic: boolean = true) {
    return new Promise((resolve, reject) => {
      try {
        let bucketName = this.publicBucket;
        if (!isPublic) {
          bucketName = this.privateBucket;
        }
        const params: any = {
          Bucket: bucketName,
          Key: filepath + filename,
          Body: filedata
        };

        if (isPublic) {
          this.s3Public.upload(params, (err: any, data: any) => {
            if (err) {
              logger.error(__filename, 'uploadFile', '', `${err}`, `${err}`);
              reject(new Error('Could not able to upload file'));
            } else {
              resolve(data);
            }
          });
        } else {
          this.s3Private.upload(params, (err: any, data: any) => {
            if (err) {
              logger.error(__filename, 'uploadFile', '', `${err}`, `${err}`);
              reject(new Error('Could not able to upload file'));
            } else {
              resolve(data);
            }
          });
        }
      } catch (err) {
        logger.error(__filename, 'uploadFile', '', `${err}`, `${err}`);
        reject(new Error('Could not able to upload file'));
      }
    });
  }

  public async uploadResizeImage(
    filename: string,
    filedata: any,
    filepath: string,
    width: number,
    height: number,
    isPublic: boolean = true
  ) {
    return new Promise((resolve, reject) => {
      try {
        sharp(filedata)
          .resize(width, height)
          .toBuffer()
          .then(async (data) => {
            const file = await this.uploadFile(filepath, filename, data, isPublic);
            resolve(file);
          })
          .catch((err) => {
            reject(new Error('Could not able to upload file'));
          });
      } catch (err) {
        reject(new Error('Could not able to upload file'));
      }
    });
  }

  public async createThumbnail(
    filepath: string,
    filename: string,
    filedata: any,
    size: number,
    isPublic: boolean = true
  ) {
    return new Promise((resolve, reject) => {
      sharp(filedata)
        .resize(size)
        .toBuffer()
        .then(async (data) => {
          const file = await this.uploadFile(filepath, filename, data, true);
          resolve(file);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async getFilePath(
    filename: string,
    time: any,
    isPublic: boolean = true,
    bucketName: string | undefined = undefined
  ) {
    return new Promise((resolve, reject) => {
      try {
        if (isPublic) {
          this.s3Public.getSignedUrl(
            'getObject',
            {
              Bucket: bucketName || this.publicBucket,
              Key: filename,
              Expires: time // in seconds
            },
            (err: any, url: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(url);
              }
            }
          );
        } else {
          this.s3Private.getSignedUrl(
            'getObject',
            {
              Bucket: bucketName || this.privateBucket,
              Key: filename,
              Expires: time // in seconds
            },
            (err: any, url: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(url);
              }
            }
          );
        }
      } catch (err) {
        // file not found
        reject(err);
      }
    });
  }

  public async deleteFile(filename: string, isPublic: boolean = true) {
    return new Promise((resolve, reject) => {
      let bucketName: any = this.publicBucket;
      if (!isPublic) {
        bucketName = this.privateBucket;
      }
      try {
        const param: any = {
          Bucket: bucketName,
          Key: filename
        };

        if (isPublic) {
          this.s3Public.deleteObject(param, (err: any, data: any) => {
            if (err) {
              reject(new Error('Could not delete file'));
            } else {
              resolve(data);
            }
          });
        } else {
          this.s3Private.deleteObject(param, (err: any, data: any) => {
            if (err) {
              reject(new Error('Could not delete file'));
            } else {
              resolve(data);
            }
          });
        }
      } catch (err) {
        reject(new Error('Could not delete file'));
      }
    });
  }

  public async getFilePathWithContentDisposition(
    filename: string,
    time: any,
    isPublic: boolean = true,
    bucketName: string | undefined = undefined
  ) {
    return new Promise((resolve, reject) => {
      try {
        if (isPublic) {
          this.s3Public.getSignedUrl(
            'getObject',
            {
              Bucket: bucketName || this.publicBucket,
              Key: filename,
              Expires: time, // in seconds
              ResponseContentDisposition: 'attachment',
              CacheControl: 'max-age=2592000'
            },
            (err: any, url: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(url);
              }
            }
          );
        } else {
          this.s3Private.getSignedUrl(
            'getObject',
            {
              Bucket: bucketName || this.privateBucket,
              Key: filename,
              Expires: time, // in seconds
              ResponseContentDisposition: 'attachment'
            },
            (err: any, url: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(url);
              }
            }
          );
        }
      } catch (err) {
        // file not found
        reject(err);
      }
    });
  }

  public async getFileObject(filename: string, isPublic: boolean = true) {
    return new Promise((resolve, reject) => {
      try {
        if (isPublic) {
          this.s3Public.getObject(
            {
              Bucket: this.publicBucket,
              Key: filename
            },
            (err: any, data: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            }
          );
        } else {
          this.s3Private.getObject(
            {
              Bucket: this.privateBucket,
              Key: filename
            },
            (err: any, data: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            }
          );
        }
      } catch (err) {
        // file not found
        reject(err);
      }
    });
  }
}

export default new AwsFileUpload();
