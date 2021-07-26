import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-website',
  template:
    `<app-navbar></app-navbar>

    <div class="dk-main">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer>`,
    
    styleUrls: ['./website.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WebsiteComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

}
