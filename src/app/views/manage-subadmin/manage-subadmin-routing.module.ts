import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSubadminComponent } from '../manage-subadmin/manage-subadmin.component';

const routes: Routes = [
  {
    path: '',
    component: ManageSubadminComponent,
    data: {
      title: `SubAdminManagement`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSubadminRoutingModule { }
