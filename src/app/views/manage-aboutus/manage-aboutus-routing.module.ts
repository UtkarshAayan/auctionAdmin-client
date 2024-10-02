import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAboutusComponent } from './manage-aboutus.component';

const routes: Routes = [  {
  path: '',
  component: ManageAboutusComponent,
  data: {
    title: `Manage Aboutus`
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAboutusRoutingModule { }
