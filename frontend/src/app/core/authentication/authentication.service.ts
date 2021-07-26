import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../../shared/models/user";
import { UserService } from "../http/user/user.service";

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private tokenSubject: BehaviorSubject<any>;
  public token: Observable<any>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    this.tokenSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("token"))
    );
    this.token = this.tokenSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  
  public get tokenValue(): User {
    return this.tokenSubject.value;
  }

  login(email, password) {
    return this.userService.login(email, password).pipe(
        map((res) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (res.ok) {
            localStorage.setItem("currentUser", JSON.stringify(res.user));
            localStorage.setItem("token", JSON.stringify(res.token));
            this.currentUserSubject.next(res.user);
            this.tokenSubject.next(res.token);
          }
          return res;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
    this.router.navigate(["/login"]);
  }

  updateUser(){
    this.userService.get(JSON.parse(localStorage.getItem("currentUser")).id).subscribe((res)=>{
      localStorage.setItem("currentUser", JSON.stringify(res.users[0]));
    }); 
  }
}
