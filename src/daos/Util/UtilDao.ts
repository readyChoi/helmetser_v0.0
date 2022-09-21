import AWS from '../../database/AwsService'

export default class UtilDao {
    displayImage(fileName:string, callback:any):void {
        AWS.displayImage(fileName).then(
            (data:any) => callback(data)
        )
    }

    displayFile = (fileName:string) => new Promise((resolve, reject) => {
        console.log('in displayFile')
        AWS.displayFile(fileName).then(
            (data:any) => resolve(data)
        )
    })

    displayFileTest = (fileName:string) => {
        return AWS.displayFileTest(fileName)
    }


    // deleteImage = (path, rollback, cb) => {
    //     AWS.deleteImage(path, rollback).then(
    //         (data: any) => cb(data)
    //     )
    // }

    deleteImage = (path) => new Promise((resolve, rejects) => {
        AWS.deleteImage(path).then(
            (data: any) => resolve(data)
        )
    })
}
