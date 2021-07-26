import { Component, Inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin',
  styleUrls: ['./admin.component.css'],
  template:
    `<app-navbar></app-navbar>
    <app-sidebar></app-sidebar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>`,
  encapsulation: ViewEncapsulation.None
})

export class AdminComponent implements OnInit {
  scripts = [
    'jquery-ui/jquery-ui.min.js',
    'jqvmap/jquery.vmap.min.js',
    'jqvmap/maps/jquery.vmap.usa.js',
    'jquery-knob/jquery.knob.min.js',
    'overlayScrollbars/js/jquery.overlayScrollbars.min.js',
    'datatables/jquery.dataTables.min.js',
    'moment/moment.min.js',
    'bootstrap/js/bootstrap.bundle.min.js',
    'chart.js/Chart.min.js',
    'sparklines/sparkline.js',
    'daterangepicker/daterangepicker.js',
    'tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js',
    'summernote/summernote-bs4.min.js',
    'select2/js/select2.full.min.js',
    'datatables-bs4/js/dataTables.bootstrap4.min.js',
    'datatables-responsive/js/dataTables.responsive.min.js',
    'datatables-responsive/js/responsive.bootstrap4.min.js',
    '../js/adminlte.js',
    '../js/demo.js'
  ]
  
  constructor(
    private renderer: Renderer2, 
    @Inject(DOCUMENT) private document: any
  ) { }
  
  ngOnInit(): void {  
    this.scripts.forEach(route => {      
      let scriptElt = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptElt, 'type', 'text/javascript');
      this.renderer.setAttribute(scriptElt, 'src', `assets/plugins/${route}`);
      this.renderer.appendChild(this.document.body, scriptElt);
    });    
  }

}
