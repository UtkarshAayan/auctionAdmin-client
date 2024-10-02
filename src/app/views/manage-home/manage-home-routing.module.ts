import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageHomeComponent } from './manage-home.component';


const routes: Routes = [  {
  path: '',
  component: ManageHomeComponent,
  data: {
    title: `Manage Home`
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHomeRoutingModule { }
