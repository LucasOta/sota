import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
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
export class ProjectsComponent implements OnInit {
  title = 'Projects';

  constructor() { }

  ngOnInit(): void {
  }

}
