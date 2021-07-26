import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
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
export class UsersComponent implements OnInit {
  title = 'Users';
  constructor() { }

  ngOnInit(): void {
  }

}
