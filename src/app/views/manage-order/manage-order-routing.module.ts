import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrderComponent } from './manage-order.component';
const routes: Routes = [
  {
    path: '',
    component: ManageOrderComponent,
    data: {
      title: `Manage Orders`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrderRoutingModule { }
