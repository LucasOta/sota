import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplines',
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
export class DisciplinesComponent implements OnInit {
  title = 'Disciplines';

  constructor() { }

  ngOnInit(): void {
  }

}
