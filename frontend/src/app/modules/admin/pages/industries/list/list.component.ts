import { Component, OnInit } from '@angular/core';
import { IndustryService } from "../../../../../core/http/industry/industry.service";
import { Industry } from "../../../../../shared/models/industry";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  industries: Industry[] = [];

  constructor(private industryService: IndustryService, private router: Router) { }

  ngOnInit(): void {
    this.industryService.get().subscribe((res)=>{
      this.industries = res.industries;
    });    
  }

  trackByFn(index, item) {    
    return item.id;
  }

  edit(id: string){
    this.router.navigate(['admin/industries/edit', id]);   
  }

}

