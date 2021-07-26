import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NotFoundComponent } from 'src/app/shared/components/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
