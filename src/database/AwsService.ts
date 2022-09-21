// import logger from '@shared/Logger';
import AWS, { S3 } from 'aws-sdk';
import {config as AWSConfig, dir} from '../config/awsConfig';

interface UploadFile extends File {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: any,
    size: number

}

class AwsService {
    s3: any;
    constructor() {
        AWS.config.update({region: AWSConfig.region})
        this.s3 = new AWS.S3({accessKeyId: AWSConfig.accessKey, secretAccessKey : AWSConfig.secretAccessKey })
    }

    private createReadParam = (filePath:string) => {
        return {
            "Bucket" : AWSConfig.bucket,
            "Key" : filePath,
        }
    }

    private createUploadParam = (file: UploadFile, typePath:string, kindPath: string) => {
        const timeStamp = new Date().getTime()
        const fileName = timeStamp + file.originalname;
        const bufferStream = file.buffer;

        return  {
            Bucket: AWSConfig.bucket,
            Key: dir.base_dir + "/" + typePath + "/" + kindPath + "/" + fileName,
            Body: bufferStream,
        };
    }

    private createDeleteParam = (path: string) => {
        return {
            Bucket: AWSConfig.bucket,
            Key : path
        }
    }


    private getS3 = () => {
        return this.s3
    }

    private photoFileFilter = (req:any, file:any, cb:any) => {
        const PHOTOS_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
        if (PHOTOS_MIME_TYPES.includes(file.mimetype)) {
            return cb(null, true)
        } else {
            console.log('invalid photo type')
            return cb(new Error("Invalid File Type Uploaded"))
        }
    }

    
    uploadImage = (file: UploadFile, typePath:string, kindPath: string) => new Promise((resolve, rejects) =>{
        this.s3.upload(
            this.createUploadParam(file, typePath, kindPath),
            (err:AWS.AWSError, data:S3.ManagedUpload.SendData) => {
                if (err) {
                    console.log(err)
                    rejects(err);
                    throw err;
                } else {
                    console.log('in awsService uploadImage, success uploadImage')
                    resolve(data);
                }
            })
    })

    deleteImage = (path: string) => new Promise((resolve, rejects) =>{
        this.s3.deleteObject(
            this.createDeleteParam(path),
            (err:AWS.AWSError, data:S3.ManagedUpload.SendData) => {
                if (err) {
                    console.log(err)
                    rejects(err);
                    throw err;
                } else {
                    resolve(data);
                }
            })
    })

    displayImage = (fileName:any) => new Promise((resolve, rejects) => {
        this.s3.getObject(this.createReadParam(fileName), (err:AWS.AWSError, data:AWS.S3.Types.GetObjectOutput) => {
            if (err) {
                console.log(err)
                rejects(err);
                throw err;
            } else {
                resolve(data);
            }
        })
    })

    displayFile = (fileName:any) => new Promise((resolve, reject) => {
        this.s3.getObject(this.createReadParam(fileName), (err:AWS.AWSError, data:AWS.S3.Types.GetObjectOutput) => {
            if (err) {
                console.log(err)
                reject(err);
                throw err;
            } else {
                console.log('get data0')
                resolve(data);
            }
        })
    })

    displayFileTest = (fileName:string) => {
        return this.s3.getObject(this.createReadParam(fileName))
    }
}

export default new AwsService();