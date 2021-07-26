import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '../../../../shared/components/pages/not-found/not-found.component';

import { CategoriesComponent } from "./categories.component";
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '', component: CategoriesComponent, children: [
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
export class CategoriesRoutingModule { }
