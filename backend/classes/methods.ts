import { Translation } from "./translation";
import { Response } from 'express';

export default class Methods {

    constructor() { };

    static emptyFieldsMsg(errors: string[]) {       
     if (errors.length == 1) {
      return `The ${errors[0]} field is necessary.`;
     } else {
      let msg = 'Los campos ';

      for (let i = 0; i < errors.length; i++) {
       msg += errors[i]; 
       errors[i + 1] ? msg+=', ' : msg+=' are necessary.'
      }
      return msg;
     }
    }

    static filterByLanguage(field: Translation[], language: string){
        
        let defTranslation = new Translation();
        let result = new Translation();
        field.forEach(t => {

            if (t.language == language && t.quote != '') result = t;           
            if (t.language == 'en') defTranslation = t;

        });
        
        if (result.quote == '') result = defTranslation;
        
        return result;
    }
    
    static sendErr(res: Response, message: any){    
        res.status(500);
        res.json({ ok: false, message })
    }

    static prettyMongooseErr(error: any){
        if (error.code) {
            if (error.code==11000) return `The value ${JSON.stringify(error.keyValue)} already exists on the database.`
        }

        return error;
    }

}