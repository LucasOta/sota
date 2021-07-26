import { Request, Response, Router } from 'express';
import Methods from '../../classes/methods';
import { verifyToken } from '../../middlewares/authentication';
import { Client, IClient } from './client.model';

const clientRoutes = Router();

// TODO: verify Token by level
clientRoutes.post('/create', [verifyToken], (req: Request, res: Response) => {
    let errors:string[] = [];
    if (!req.body.name) errors.push('name');
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }
    
    const client = new Client();
    client.name = req.body.name;
    if (req.body.website) client.website = req.body.website;

    Client.findOne({"name": client.name}, (err, clientDB) => {

        if (err) Methods.sendErr(res, err);

        if (clientDB) {
            return res.json({
                ok: false,
                desc: 'A client with that name already exists.'
            });
        } else {
            Client
                .create(client)
                .then(clientDB => {
                    res.status(201);
                    return res.json({ ok: true, desc: 'Client created', client: clientDB });
                })
                .catch(err =>  Methods.sendErr(res, err) );
        }

    }).catch(err => Methods.sendErr(res, err) );

});


// TODO: verify Token by level
clientRoutes.patch('/update', [verifyToken], (req: any, res: Response) => {
    let errors:string[] = [];
    if (!req.body._id) errors.push('ID'); 
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }   

    let client = <IClient>{ modified: new Date() }

    if (req.body.name) client.name = req.body.name;
    client.website = req.body.website;

    Client
        .findByIdAndUpdate(req.body._id, client, { new: true }, (err, clientDB) => {

            if (err) return Methods.sendErr(res, err);

            if (!clientDB)  return res.json({ ok: false, desc: 'There is no client with that ID' });

            return res.json({ ok: true, desc:'Client updated', client: clientDB });

        })
        .catch(err => Methods.sendErr(res, err) );

});

// Get All
clientRoutes.get ('/', async (req: any, res: Response) => {

    let clients = await Client
        .find()
        .sort({ _id: -1 })
        .exec()
        .catch(err => Methods.sendErr(res, err) );
    
    return res.json({ ok: true, clients });

});

// Get ById
clientRoutes.get ('/:clientid', async (req: any, res: Response) => {
    const id = req.params.clientid;

    let clients = await Client
        .findById(id)
        .exists('deleted', false)
        .sort({ _id: -1 })
        .exec()
        .catch(err => Methods.sendErr(res, err) );
    
    if (!clients) return res.json({ok:true, desc: 'No client found'});  

    return res.json({ ok: true, clients });

});

// Delete
clientRoutes.delete ('/:clientid', [verifyToken], async (req: any, res: Response) => {
    const id = req.params.clientid;
    await Client
        .findByIdAndDelete(id)
        .catch(err => Methods.sendErr(res, err) );

    // TODO: Erase client references
    res.json({ ok: true, desc: 'Client deleted' });
})




export default clientRoutes;