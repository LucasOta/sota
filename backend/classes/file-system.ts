import { FileUpload } from '../interfaces/file-upload';

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() { };

    saveTempImage(file: FileUpload, userId: string, prefix?: string) {
        return new Promise((resolve, reject, ) => {

            const path = this.createUserFolder(userId);
            let fileName = this.generateUniqueName(file.name);
            if (prefix) fileName = `${prefix}_${fileName}`;

            // Move the file from Temp to our folder
            file.mv(`${path}/${fileName}`, (err: any) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(fileName);
                }

            });

        });
    }    

    deleteTempImage(userId: string, fileName: string) {
        return new Promise<void>((resolve, reject, ) => {

            const path = this.createUserFolder(userId) ;

            try {
                if (fs.existsSync(`${path}/${fileName}`)) {
                    fs.unlinkSync(`${path}/${fileName}`);
                }
                resolve();
              } catch(err) {
                reject(err);
              }

        });
    }    
    
    deleteImage(moduleName: string, elementID: string, img: string) {
        const pathFile = path.resolve(__dirname, '../uploads', moduleName, elementID, img);

        return new Promise<void>((resolve, reject, ) => {

            try {
                fs.unlinkSync(pathFile);
                resolve();
              } catch(err) {
                reject(err);
              }

        });
    }  

    // TODO: delete folder when a element is deleted
    deleteFolder(moduleName: string, elementID: string, img: string) {
        const pathFile = path.resolve(__dirname, '../uploads', moduleName, elementID, img);

        //TODO
    }    
    
    deleteImagesNotIncludedIn(moduleName: string, elementID: string, imgsIncluded: string[]) {
        
        const folderPath = path.resolve(__dirname, '../uploads', moduleName, elementID);        
        
        fs.readdir(folderPath, function (err, files) {

            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            const imgsToBeDeleted = files.filter(imgName => imgsIncluded.indexOf(imgName) == -1);
        
            imgsToBeDeleted.forEach(img => {
                let pathFile = path.resolve(folderPath, img);
                try {
                    fs.unlinkSync(pathFile);
                } catch(err) {
                    console.error(err);
                }
                
            });
        });

    }    

    filesFromTempToFolder(userId: string, moduleName: string, elementID: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');        
        const pathPost = path.resolve(__dirname, '../uploads/', moduleName, elementID);

        if (!fs.existsSync(pathTemp)) {
            return [];
        }

        if (!fs.existsSync(pathPost)) {
            this.checkPath(['../uploads/', moduleName, elementID]);
        }

        const imagenesTemp = this.getTempFiles(userId);

        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`)
        });

        return imagenesTemp;
    }

    getFileUrl(moduleName: string, elementID: string, img: string) {
        const pathFile = path.resolve(__dirname, '../uploads', moduleName, elementID, img);

        // If there is no image
        if (!fs.existsSync(pathFile)) return path.resolve(__dirname, '../assets/400x250.jpg');
        
        return pathFile;
    }


    private generateUniqueName(originalName: string) {
        const arrName = originalName.split('.');
        const extension = arrName[arrName.length - 1];

        const uniqueId = uniqid();

        return `${uniqueId}.${extension}`;
    }


    private createUserFolder(userId: string) {
        const userPath = path.resolve(__dirname, '../uploads/', userId);
        const tempUserPath = userPath + '/temp';
        
        this.checkPath(['../uploads/', userId, 'temp']);

        return tempUserPath;
    }

    private getTempFiles(userId: string) {
        const tempPath = path.resolve(__dirname, '../uploads/', userId, 'temp');

        return fs.readdirSync(tempPath) || [];
    }

    private checkPath(pPath: string[]){
        let partialPath = path.resolve(__dirname);
        
        pPath.forEach(subPath => {
            partialPath = path.resolve(partialPath, subPath);
                        
            if (!fs.existsSync(partialPath)) {
                fs.mkdirSync(partialPath);
            }
        });
    }

}