import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from '../../shared/components/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'categories', loadChildren: () => import(`./pages/categories/categories.module`).then(m => m.CategoriesModule) },
      { path: 'clients', loadChildren: () => import(`./pages/clients/clients.module`).then(m => m.ClientsModule) },
      { path: 'contacts', loadChildren: () => import(`./pages/contacts/contacts.module`).then(m => m.ContactsModule) },
      { path: 'disciplines', loadChildren: () => import(`./pages/disciplines/disciplines.module`).then(m => m.DisciplinesModule) },
      { path: 'industries', loadChildren: () => import(`./pages/industries/industries.module`).then(m => m.IndustriesModule) },
      { path: 'projects', loadChildren: () => import(`./pages/projects/projects.module`).then(m => m.ProjectsModule) },
      { path: 'users', loadChildren: () => import(`./pages/users/users.module`).then(m => m.UsersModule) },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
