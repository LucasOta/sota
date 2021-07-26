import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/http/user/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  moduleName = 'users'; 

  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.get().subscribe((res)=>{
      this.users = res.users;
    });    
  }

  trackByFn(index, item) {    
    return item.id;
  }

  edit(id: string){
    this.router.navigate(['admin/users/edit', id]);   
  }

}
