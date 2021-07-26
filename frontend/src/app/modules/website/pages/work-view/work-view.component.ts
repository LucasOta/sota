import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ProjectService } from 'src/app/core/http/project/project.service';
import { Project } from 'src/app/shared/models/project';
import { set as setModuleName } from "src/app/shared/actions/moduleName.actions";
import { set as setElementId } from "src/app/shared/actions/elementId.actions";

@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.css']
})
export class WorkViewComponent implements OnInit {
  moduleName = 'projects'; 
  id: any;
  project: Project;

  constructor( 
    private projectService: ProjectService, 
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router ) {
      
    this.store.dispatch(setModuleName({moduleName: this.moduleName}));

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.store.dispatch(setElementId({elementId: this.id}));
      this.ngOnInit();
    });

   }


  ngOnInit(): void {
    this.projectService.get(false, this.id).subscribe((res)=>{
      res.ok ? this.project = res.projects : this.router.navigate(['/work']); 
    });
    window.scroll(0,0);
  }

}
