import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';

export class Translation {
    language: string;
    quote: string;

    constructor(language: string, quote: string){
        this.language = language;
        this.quote = quote;
    }
}

export function createTranslationForm(fieldsRequired = true){
    let form = new FormArray([
        new FormGroup({
            language: new FormControl('en', Validators.required),
            quote: new FormControl('')
        }),
        new FormGroup({
            language: new FormControl('es', Validators.required),
            quote: new FormControl('')
        }),
        new FormGroup({
            language: new FormControl('de', Validators.required),
            quote: new FormControl('')
        })
    ]);

    if (fieldsRequired) (form.at(0) as FormGroup).setControl('quote', new FormControl('', Validators.required));
    
    return form;
}
