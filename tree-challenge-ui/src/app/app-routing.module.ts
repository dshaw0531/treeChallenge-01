import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './components/tree/tree.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tree',
    component: TreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
