import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industries',
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
export class IndustriesComponent implements OnInit {
  title = 'Industries';

  constructor() { }

  ngOnInit(): void {
  }

}
