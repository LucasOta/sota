import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IndustryService } from 'src/app/core/http/industry/industry.service';
import { LanguageSelectorConfig } from 'src/app/shared/components/language-selector/language-selector.component';
import { Industry } from 'src/app/shared/models/industry';
import { MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';
import { Translation, createTranslationForm } from 'src/app/shared/models/translation';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { set, reset } from "src/app/shared/actions/formSubmitted.actions";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  moduleName = 'industries'; 

  title = 'New Industry';
  createForm: FormGroup;
  industry = new Industry();
  industries: Industry[] = [];
  state: any;
  id: any;

  nameMultilanguageInputConfig = new MultilanguageTextInputConfig();
  languageSelectorConfig = new LanguageSelectorConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private industryService: IndustryService,    
    private store: Store<AppState>,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");
      this.initializeComponents();
    }

  ngOnInit(): void { 
    
    this.createForm = this.formBuilder.group({
      name: createTranslationForm()
    });
    this.nameMultilanguageInputConfig.formArray = this.createForm.get('name') as FormArray;
    

    if (this.id) {
      this.title = 'Edit Industry'

      this.industryService.get(true, this.id).subscribe((res)=>{
        this.industry = res.industries;
        this.f.name.setValue(this.industry.name); 
      });   
    }
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.setSubmitted();

    if (this.createForm.invalid) {       
      return;
    }
    
    this.industry.name = this.f.name.value as Translation[];
    
    if (!this.id) { 
      this.industryService.create(this.industry)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.industryService.update(this.industry)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); } 
        );
    }    
  }

  onDelete(){
    // TODO: show alert asking if sure
    this.industryService.delete(this.id)
    .pipe(first())
    .subscribe(
      data => { if (data.ok) this.goToList(); }
    );
  }

  setSubmitted(){
    this.store.dispatch(set());
  }

  private initializeComponents(){
    let scope = this;

    this.nameMultilanguageInputConfig.fieldName = 'Name';
    this.nameMultilanguageInputConfig.required = true;

    this.cardFooterConfig.cancelAction = function() { scope.goToList(); };
    this.cardFooterConfig.deleteAction = function() { scope.onDelete(); };
    this.cardFooterConfig.id = this.id;
    
  }

  goToList(){
    this.store.dispatch(reset());
    this.router.navigate(['admin/industries/list']);
  }
}
