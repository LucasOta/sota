import { Response, Router } from 'express';
import FileSystem from '../../classes/file-system';
import Methods from '../../classes/methods';
import { FileUpload } from '../../interfaces/file-upload';
import { verifyToken } from '../../middlewares/authentication';

const fileRoutes = Router();
const fileSystem = new FileSystem();

fileRoutes.post('/upload', [verifyToken], async (req: any, res: Response) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            desc: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if (!file) {
        return res.status(400).json({
            ok: false,
            desc: 'No se subió ningun archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            desc: 'Lo que subió no es una imagen'
        });
    }
    let desc;
    if (req.body.prefix) desc = req.body.prefix;
    fileSystem.saveTempImage(file, req.user._id, desc).then(
        result => {
            res.json({
                ok: true,
                file: {
                    mimetype: file.mimetype,
                    name: result
                }
            });
        },
        error => { Methods.sendErr(res, error) }
    );   

});

fileRoutes.get('/image/:modulename/:elementid/:img', (req: any, res: Response) => {

    const moduleName = req.params.modulename;
    const elementId = req.params.elementid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFileUrl(moduleName, elementId, img);

    res.sendFile(pathFoto);

});

fileRoutes.delete('/:modulename/:elementid/:img', (req: any, res: Response) => {

    const moduleName = req.params.modulename;
    const elementId = req.params.elementid;
    const img = req.params.img;

    fileSystem.deleteImage(moduleName, elementId, img).then(
        result => {
            res.json({
                ok: true,
                // desc: 'Temp Img deleted.'
            });
        },
        error => { Methods.sendErr(res, error) }
    );

});

fileRoutes.delete('/deleteTemp/:imgName', [verifyToken], async (req: any, res: Response) => {

    fileSystem.deleteTempImage(req.user._id, req.params.imgName).then(
        result => {
            res.json({
                ok: true,
                // desc: 'Temp Img deleted.'
            });
        },
        error => { Methods.sendErr(res, error) }
    );   

});

export default fileRoutes;