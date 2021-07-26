import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import(`./modules/admin/admin.module`).then(m => m.AdminModule) },
  { path: '', loadChildren: () => import(`./modules/website/website.module`).then(m => m.WebsiteModule) },
  { path: 'login', loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule) },
  { path: 'site', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
