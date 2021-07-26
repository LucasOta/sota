import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../../../../core/http/project/project.service";
import { Project } from "../../../../../shared/models/project";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  moduleName = 'projects'; 
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectService.get().subscribe((res)=>{
      this.projects = res.projects;
    });    
  }

  trackByFn(index, item) {    
    return item.id;
  }

  edit(id: string){
    this.router.navigate(['admin/projects/edit', id]);   
  }

}
