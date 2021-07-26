import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CategoryService } from 'src/app/core/http/category/category.service';
import { FileService } from 'src/app/core/http/file/file.service';
import { Category } from 'src/app/shared/models/category';

import { ImgPickerConfig } from "../../../components/form/image-picker/image-picker.component";
import { LanguageSelectorConfig } from '../../../../../shared/components/language-selector/language-selector.component';
import { MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';
import { Translation, createTranslationForm } from 'src/app/shared/models/translation';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { set, reset } from "src/app/shared/actions/formSubmitted.actions";
import { set as setElementId } from "src/app/shared/actions/elementId.actions";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  moduleName = 'categories';

  title = 'New Category';
  submitText = 'Create'
  createForm: FormGroup;
  category = new Category();
  categories: Category[] = [];
  state: any;
  id: any;

  imgPickerConfig = new ImgPickerConfig();
  nameMultilanguageInputConfig = new MultilanguageTextInputConfig();
  languageSelectorConfig = new LanguageSelectorConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private fileService: FileService,
    private store: Store<AppState>,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get("id");
      this.store.dispatch(setElementId({elementId: this.id}));
      this.initializeComponents();
    }

  ngOnInit(): void { 
    
    this.createForm = this.formBuilder.group({
      name: createTranslationForm()
    });
    this.nameMultilanguageInputConfig.formArray = this.createForm.get('name') as FormArray;    

    if (this.id) {
      this.title = 'Edit Category'
      this.submitText = 'Edit'

      this.categoryService.get(true, this.id).subscribe((res)=>{
        // TODO: handle errors
        this.category = res.categories;
        this.f.name.setValue(this.category.name);  
      });   
    }   
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.setSubmitted();

    if (this.createForm.invalid) return;
    
    this.category.name = this.f.name.value as Translation[];
    
    if (!this.id) { 
      this.categoryService.create(this.category)
      .pipe(first())
      .subscribe(
        data => { if (data.ok) this.goToList(); }
      );      
    } else {
      this.categoryService.update(this.category)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );
    }    
  }

  delete(){
    // TODO: show alert asking if sure
    this.categoryService.delete(this.id)
    .pipe(first())
    .subscribe(
      data => { if (data.ok) this.goToList(); }
    );
  }

  setSubmitted(){
    this.store.dispatch(set());
  }

  private initializeComponents(){
    this.imgPickerConfig.fieldName = 'Image';
    this.imgPickerConfig.maxImgs = 1;

    this.nameMultilanguageInputConfig.fieldName = 'Name';
    this.nameMultilanguageInputConfig.required = true;

    // var scope = this;
    // TODO: use cardfooterconfig
  }

  goToList(){
    this.store.dispatch(reset());
    this.router.navigate(['admin/categories/list']);
  }
}
