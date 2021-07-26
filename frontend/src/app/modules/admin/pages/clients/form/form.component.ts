import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientService } from 'src/app/core/http/client/client.service';
import { Client } from 'src/app/shared/models/client';
import { TextInputConfig } from '../../../components/form/text-input/text-input.component';
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
  moduleName = 'clients'; 

  title = 'New Client';
  createForm: FormGroup;
  client = new Client();
  state: any;
  id: any;

  nameTextInputConfig = new TextInputConfig();
  websiteTextInputConfig = new TextInputConfig();

  cardFooterConfig = new CardFooterConfig();
  

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService, 
    private store: Store<AppState>,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");

      this.initializeComponents();
  }

  ngOnInit(): void {

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      website: [''],
    });
    this.nameTextInputConfig.formControl = this.createForm.get('name') as FormControl;
    this.websiteTextInputConfig.formControl = this.createForm.get('website') as FormControl;    

    if (this.id) {
      this.title = 'Edit Discipline'

      this.clientService.get(this.id).subscribe((res)=>{
        this.client = res.clients;

        this.f.name.setValue(this.client.name);
        if (this.client.website) this.f.website.setValue(this.client.website);
      });   
    }

  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.setSubmitted();

    if (this.createForm.invalid) {       
      return;
    }
    
    this.client.name = this.f.name.value;
    this.client.website = this.f.website.value;
    
    
    if (! this.id) { 
      this.clientService.create(this.client)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); }
        );      
    } else {
      this.clientService.update(this.client)
        .pipe(first())
        .subscribe(
          data => { if (data.ok) this.goToList(); } 
        );
    }    
  }

  onDelete(){
    // TODO: show alert asking if sure
    this.clientService.delete(this.id)
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

    this.nameTextInputConfig.fieldName = 'Name';
    this.nameTextInputConfig.required = true;
    
    this.websiteTextInputConfig.fieldName = 'Website';
    this.websiteTextInputConfig.required = false;


    this.cardFooterConfig.cancelAction = function() { scope.goToList(); };
    this.cardFooterConfig.deleteAction = function() { scope.onDelete(); };
    this.cardFooterConfig.id = this.id;

  }

  goToList(){
    this.store.dispatch(reset());
    this.router.navigate(['admin/clients/list']);
  }

}
