import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ContactService } from 'src/app/core/http/contact/contact.service';
import { Contact } from 'src/app/shared/models/contact';
import { CardFooterConfig } from '../../../components/cards/card-footer/card-footer.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  moduleName = 'contacts'; 

  title = 'New Contact';
  contact: Contact = new Contact();
  id: any;

  cardFooterConfig = new CardFooterConfig();

  constructor(
    private contactService: ContactService,
    private router: Router,    
    private route: ActivatedRoute) { 
      this.id= this.route.snapshot.paramMap.get("id");
    }

  ngOnInit(): void { 
    if (this.id) {
      this.title = 'View Contact'

      this.contactService.get(this.id).subscribe((res)=>{
        this.contact = res.contact;
      });   
    }
    
  }

  onDelete(){
    // TODO: show alert asking if sure
    this.contactService.delete(this.id)
    .pipe(first())
    .subscribe(
      data => { if (data.ok) this.goToList(); }
    );
  }

  goToList(){
    this.router.navigate(['admin/contacts/list']);
  }
}
