import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/http/project/project.service';
import { DisciplineService } from 'src/app/core/http/discipline/discipline.service';
import { IndustryService } from 'src/app/core/http/industry/industry.service';
import { Project } from 'src/app/shared/models/project';
import { Discipline } from 'src/app/shared/models/discipline';
import { Industry } from 'src/app/shared/models/industry';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})

export class WorkComponent implements OnInit {
  projects: Project[] = [];
  disciplines: Discipline[] = [];
  industries: Industry[] = [];

  constructor(
    private projectService: ProjectService,
    private disciplineService: DisciplineService,
    private industryService: IndustryService
    ) { }

  ngOnInit(): void {

    this.projectService.getAllWebsite(false, true).subscribe((res)=>{
      this.projects = res.projects;
      this.projects.forEach(p => p._show = true);
    });

    this.disciplineService.get().subscribe((res)=>{
      this.disciplines = res.disciplines;
    });

    this.industryService.get().subscribe((res)=>{
      this.industries = res.industries;
    });

  }
}