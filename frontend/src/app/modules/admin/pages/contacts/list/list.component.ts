import { Component, OnInit } from '@angular/core';
import { ContactService } from "../../../../../core/http/contact/contact.service";
import { Contact } from "../../../../../shared/models/contact";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.contactService.get().subscribe((res)=>{
      this.contacts = res.contacts;
    });    
  }

  trackByFn(index, item) {    
    return item.id;
  }

  view(id: string){
    this.router.navigate(['admin/contacts/edit', id]);   
  }

}

