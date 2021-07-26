import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ContactService } from 'src/app/core/http/contact/contact.service';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  model = new Contact();
  status = {
    submitted: false,
    sending: false,
    sent: false
  };
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {}

  onSubmit() {
    this.status.submitted = true;

    if(this.model.name && this.model.email && this.model.message){
      this.status.sending = true;

      this.contactService.create(this.model)
        .pipe(first())
        .subscribe(
          data => { 
            if (data.ok) {
              setTimeout(() => {                
                this.status.sending = false; 
                this.status.sent = true; 
              }, 750);
            }
          }
        );
    }    
  }
}
