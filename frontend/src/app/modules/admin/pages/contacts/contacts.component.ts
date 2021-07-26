import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  template:
  `
    <div class="content-wrapper">
      <app-content-header [title]="title"></app-content-header>
      <section class="content">
          <router-outlet></router-outlet>
      </section>
    </div>
  `
})
export class ContactsComponent implements OnInit {
  title = 'Contacts';

  constructor() { }

  ngOnInit(): void {
  }

}
