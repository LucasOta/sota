import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteComponent } from "./website.component";
import { HomeComponent } from "./pages/home/home.component";
import { WorkComponent } from './pages/work/work.component';
import { WorkViewComponent } from './pages/work-view/work-view.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '', component: WebsiteComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'work', component: WorkComponent },
      { path: 'view/:id', component: WorkViewComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },     
    ]
  }
];
//TODO: Add notFound

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
