import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisciplineService } from 'src/app/core/http/discipline/discipline.service';
import { Discipline } from 'src/app/shared/models/discipline';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  disciplines: Discipline[] = [];

  constructor(private disciplineService: DisciplineService, private router: Router) { }

  ngOnInit(): void {
    this.disciplineService.get().subscribe((res)=>{
      this.disciplines = res.disciplines;
    });    
  }

  trackByFn(index, item) {    
    return item.id;
  }

  edit(id: string){
    this.router.navigate(['admin/disciplines/edit', id]);   
  }

}
