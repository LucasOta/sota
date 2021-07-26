import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '../../../../shared/components/pages/not-found/not-found.component';
import { FormComponent } from './form/form.component';

import { ClientsComponent } from "./clients.component";
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', component: ClientsComponent, children: [
      { path: '', component: ListComponent },
      { path: 'create', component: FormComponent },
      { path: 'edit/:id', component: FormComponent},
      { path: 'list', redirectTo: '', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
