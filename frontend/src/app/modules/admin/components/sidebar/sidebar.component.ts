import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from "../../../../core/authentication/authentication.service";
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User = null;
  constructor(private authenticationService: AuthenticationService,private renderer: Renderer2) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

  closeSideBar(){
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    this.renderer.addClass(document.body, 'sidebar-collapse');
  }
}
