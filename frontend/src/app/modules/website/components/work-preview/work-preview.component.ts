import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import { Router } from "@angular/router";

@Component({
  selector: 'app-work-preview',
  templateUrl: './work-preview.component.html',
  styleUrls: ['./work-preview.component.css']
})
export class WorkPreviewComponent implements OnInit {
  @Input() project: Project;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  view(){
    this.router.navigate(['/view', this.project._id]); 
  }

}
