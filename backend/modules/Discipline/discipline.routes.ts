import { Request, Response, Router } from 'express';
import FileSystem from '../../classes/file-system';
import Methods from '../../classes/methods';
import { verifyToken } from '../../middlewares/authentication';
import { Discipline, IDiscipline } from './discipline.model';

const disciplineRoutes = Router();

// TODO: verify Token by level
disciplineRoutes.post('/create', [verifyToken], (req: Request, res: Response) => {
    let errors:string[] = [];
    if (!req.body.name) errors.push('name');
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }
    
    const discipline = new Discipline();
    discipline.name = req.body.name;

    Discipline.findOne({"name": discipline.name[0]}, (err, disciplineDB) => {

        if (err) Methods.sendErr(res, err);

        if (disciplineDB) {
            return res.json({
                ok: false,
                desc: 'A discipline with that name already exists.'
            });
        } else {
            Discipline
                .create(discipline)
                .then(disciplineDB => {
                    res.status(201);
                    return res.json({ ok: true, desc: 'Discipline created', discipline: disciplineDB });
                })
                .catch(err =>  Methods.sendErr(res, err) );
        }

    }).catch(err => Methods.sendErr(res, err) );

});


// TODO: verify Token by level
disciplineRoutes.patch('/update', [verifyToken], (req: any, res: Response) => {
    let errors:string[] = [];
    if (!req.body._id) errors.push('ID'); 
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }   

    let discipline = <IDiscipline>{ modified: new Date() }

    if (req.body.name) discipline.name = req.body.name;

    Discipline
        .findByIdAndUpdate(req.body._id, discipline, { new: true }, (err, disciplineDB) => {

            if (err) return Methods.sendErr(res, err);

            if (!disciplineDB)  return res.json({ ok: false, desc: 'There is no discipline with that ID' });

            return res.json({ ok: true, desc:'Discipline updated', discipline: disciplineDB });

        })
        .catch(err => Methods.sendErr(res, err) );

});

// Get All
disciplineRoutes.get ('/', async (req: any, res: Response) => {    
    const lang = req.get('Accept-Language');

    let disciplines = await Discipline
        .find()
        .sort({ _id: -1 })
        .exec()
        .catch(err => Methods.sendErr(res, err) );

    if (lang != '' && disciplines) {
        // @ts-ignore
        disciplines.forEach(c => {
            // @ts-ignore
            c.name = [Methods.filterByLanguage(c.name, lang)];
        });
    }
    
    return res.json({ ok: true, disciplines });

});

// Get ById
disciplineRoutes.get ('/:disciplineid', async (req: any, res: Response) => {
    const id = req.params.disciplineid;
    const lang = req.get('Accept-Language');
    var ObjectId = require('mongoose').Types.ObjectId;
    if (!ObjectId.isValid(id)){
        return res.json({ok:false, desc: 'No discipline found'})
    }

    let disciplines = await Discipline
        .findById(id)
        .exists('deleted', false)
        .sort({ _id: -1 })
        .exec()
        .catch(err => Methods.sendErr(res, err) );
    
    if (!disciplines) return res.json({ok:true, desc: 'No discipline found'});

    if (lang != '' && disciplines) {
        // @ts-ignore
        disciplines.name = [Methods.filterByLanguage(disciplines.name, lang)];
    }    

    return res.json({ ok: true, disciplines });

});

// Delete
disciplineRoutes.delete ('/:disciplineid', [verifyToken], async (req: any, res: Response) => {
    const id = req.params.disciplineid;
    await Discipline
        .findByIdAndDelete(id)
        .catch(err => Methods.sendErr(res, err) );

    // TODO: Erase discipline references
    res.json({ ok: true, desc: 'Discipline deleted' });
})




export default disciplineRoutes;