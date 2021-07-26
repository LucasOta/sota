import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
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
export class ClientsComponent implements OnInit {
  title = 'Clients';

  constructor() { }

  ngOnInit(): void {
  }

}
