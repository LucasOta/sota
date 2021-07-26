import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/http/project/project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }
  ngOnInit(): void {
    this.projectService.getAllWebsite(true).subscribe((res)=>{
      this.projects = res.projects;
    });
  }

}
