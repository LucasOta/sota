import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/http/client/client.service';
import { Client } from 'src/app/shared/models/client';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clients: Client[] = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.get().subscribe((res)=>{
      this.clients = res.clients;
    });    
  }

  trackByFn(index, item) {    
    return item.id;
  }

  edit(id: string){
    this.router.navigate(['admin/clients/edit', id]);   
  }

}
