import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
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
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  constructor() { }

  ngOnInit(): void {
  }

}
