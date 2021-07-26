import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ProjectService } from 'src/app/core/http/project/project.service';
import { ClientService } from 'src/app/core/http/client/client.service';
import { IndustryService } from 'src/app/core/http/industry/industry.service';
import { DisciplineService } from 'src/app/core/http/discipline/discipline.service';

import { Project } from 'src/app/shared/models/project';

import { LanguageSelectorConfig } from 'src/app/shared/components/language-selector/language-selector.component';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';
import { MultilanguageTextInputConfig } from '../../../components/form/multilanguage-text-input/multilanguage-text-input.component';
import { MultilanguageTextAreaConfig } from '../../../components/form/multilanguage-text-area/multilanguage-text-area.component';
import { createTranslationForm } from 'src/app/shared/models/translation';
import { DropDownListInputConfig } from '../../../components/form/drop-down-list/drop-down-list.component';
import { CheckboxConfig } from '../../../components/form/checkbox/checkbox.component';
import { ImgPickerConfig } from '../../../components/form/image-picker/image-picker.component';
import { createItemForm } from "src/app/shared/models/item";

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { set, reset } from "src/app/shared/actions/formSubmitted.actions";
import { set as setModuleName } from "src/app/shared/actions/moduleName.actions";
import { set as setElementId } from "src/app/shared/actions/elementId.actions";
import { TextInputConfig } from '../../../components/form/text-input/text-input.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  moduleName = 'projects'; 

  pageTitle = 'New Project';
  createForm: FormGroup;
  project = new Project();
  projects: Project[] = [];
  state: any;
  id: any;

  orderInputConfig = new TextInputConfig();
  titleMultilanguageInputConfig = new MultilanguageTextInputConfig();
  descMultilanguageAreaConfig = new MultilanguageTextAreaConfig();
  languageSelectorConfig = new LanguageSelectorConfig();

  playgroundCheckboxConfig = new CheckboxConfig();
  featuredCheckboxConfig = new CheckboxConfig();
  clientsDropDownListInputConfig = new DropDownListInputConfig();
  industriesDropDownListInputConfig = new DropDownListInputConfig();
  disciplinesDropDownListInputConfig = new DropDownListInputConfig();
  
  coverImgPickerConfig = new ImgPickerConfig();
  thumbImgPickerConfig = new ImgPickerConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private clientService: ClientService,
    private industryService: IndustryService,
    private disciplineService: DisciplineService,
    private store: Store<AppState>,
    private router: Router,    
    private route: ActivatedRoute) {
      this.id= this.route.snapshot.paramMap.get("id");
      this.store.dispatch(setModuleName({moduleName: this.moduleName}));
      this.store.dispatch(setElementId({elementId: this.id}));
      this.initializeComponents();
    }

  ngOnInit(): void { 
    
    this.createForm = this.formBuilder.group({
      _id: [''],
      order: [null, Validators.required],
      title: createTranslationForm(),
      description: createTranslationForm(),
      playground: [false],
      featured: [false],
      clients: ['', Validators.required],
      industries: ['', Validators.required],
      disciplines: ['', Validators.required],
      coverImg: this.formBuilder.array([]),
      thumbnail: this.formBuilder.array([]),
      blocks: this.formBuilder.array([]),
    });
    this.playgroundCheckboxConfig.formControl = this.createForm.get('playground') as FormControl;
    this.featuredCheckboxConfig.formControl = this.createForm.get('featured') as FormControl;
    this.clientsDropDownListInputConfig.formControl = this.createForm.get('clients') as FormControl;
    this.industriesDropDownListInputConfig.formControl = this.createForm.get('industries') as FormControl;
    this.disciplinesDropDownListInputConfig.formControl = this.createForm.get('disciplines') as FormControl;
    
    this.orderInputConfig.formControl = this.createForm.get('order') as FormControl;
    this.titleMultilanguageInputConfig.formArray = this.createForm.get('title') as FormArray;
    this.descMultilanguageAreaConfig.formArray = this.createForm.get('description') as FormArray;
    
    this.coverImgPickerConfig.formArray = this.createForm.get('coverImg') as FormArray;
    this.thumbImgPickerConfig.formArray = this.createForm.get('thumbnail') as FormArray;

    if (this.id) this.setProject();
    
  }

  setProject(){
    this.pageTitle = 'Edit Project'

    this.projectService.get(true, this.id).subscribe((res)=>{
      this.project = res.projects;

      this.f._id.setValue(this.project._id);  
      this.f.order.setValue(this.project.order);  
      this.f.title.setValue(this.project.title);  
      this.f.description.setValue(this.project.description);  
      
      this.f.playground.setValue(this.project.playground);
      this.f.featured.setValue(this.project.featured);
      this.f.clients.setValue(this.getIdArray(this.project.clients));
      this.f.industries.setValue(this.getIdArray(this.project.industries));
      this.f.disciplines.setValue(this.getIdArray(this.project.disciplines));
      
      this.setBlocks();

      this.coverImgPickerConfig.setImgs(this.project.coverImg);
      this.thumbImgPickerConfig.setImgs(this.project.thumbnail);
    }); 
  }

  setBlocks(){
    this.project.blocks.forEach(block => {
      (this.f.blocks as FormArray).push(new FormGroup({
        bgColor: new FormControl(block.bgColor),
        fontColor: new FormControl(block.fontColor),
        items: this.setItems(block.items)
      }));
    });
  }

  setItems(items: any[]){
    const itemsForm = this.formBuilder.array([]);
    items.forEach(item => {
      createItemForm(itemsForm, item.typeOfItem, item);
    });
    return itemsForm;
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  getIdArray(obj: any[]){
    let ids = [];
    obj.forEach(o => ids.push(o._id) );
    
    return ids;
  }

  onSubmit() {
    this.setSubmitted();
    
    if (this.createForm.invalid) {       
      return;
    }
    
    this.project = this.createForm.value;
    
    if (! this.id) { 
      this.projectService.create(this.project)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.projectService.update(this.project)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); } 
        );
    }    
  }

  onDelete(){
    // TODO: show alert asking if sure
    this.projectService.delete(this.id)
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

    this.orderInputConfig.fieldName = 'Order';
    this.orderInputConfig.required = true;
    
    this.titleMultilanguageInputConfig.fieldName = 'Title';
    this.titleMultilanguageInputConfig.required = true;
    
    this.descMultilanguageAreaConfig.fieldName = 'Description';
    this.descMultilanguageAreaConfig.required = true;
    

    this.playgroundCheckboxConfig.fieldName = 'Playground';
    this.featuredCheckboxConfig.fieldName = 'Featured';

    this.clientsDropDownListInputConfig.fieldName = 'Clients';
    this.clientsDropDownListInputConfig.required = true;
    this.clientsDropDownListInputConfig.options = [];
    this.clientService.get().subscribe((res)=>{
      res.clients.forEach(c => {
        this.clientsDropDownListInputConfig.options.push({key: c.name, value: c._id});
      });
    });

    this.industriesDropDownListInputConfig.fieldName = 'Industries';
    this.industriesDropDownListInputConfig.required = true;
    this.industriesDropDownListInputConfig.options = [];
    this.industryService.get().subscribe((res)=>{
      res.industries.forEach(i => {
        this.industriesDropDownListInputConfig.options.push({key: i.name[0].quote, value: i._id});
      });
    });

    this.disciplinesDropDownListInputConfig.fieldName = 'Disciplines';
    this.disciplinesDropDownListInputConfig.required = true;
    this.disciplinesDropDownListInputConfig.options = [];
    this.disciplineService.get().subscribe((res)=>{
      res.disciplines.forEach(d => {
        this.disciplinesDropDownListInputConfig.options.push({key: d.name[0].quote, value: d._id});
      });
    });


    this.coverImgPickerConfig.fieldName = 'Cover';
    this.coverImgPickerConfig.prefix = 'cover';
    this.coverImgPickerConfig.maxImgs = 1;
    
    this.thumbImgPickerConfig.fieldName = 'Thumbnail';
    this.thumbImgPickerConfig.prefix = 'thumb';
    this.thumbImgPickerConfig.maxImgs = 1;


    this.cardFooterConfig.cancelAction = function() { scope.goToList(); };
    this.cardFooterConfig.deleteAction = function() { scope.onDelete(); };
    this.cardFooterConfig.id = this.id;

  }

  goToList(){    
    this.store.dispatch(reset());
    this.router.navigate(['admin/projects/list']);
  }
}
