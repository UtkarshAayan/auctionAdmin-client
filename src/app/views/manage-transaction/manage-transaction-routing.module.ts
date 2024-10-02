import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTransactionComponent } from './manage-transaction.component';
const routes: Routes = [
  {
    path: '',
    component: ManageTransactionComponent,
    data: {
      title: `Manage Transactions`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTransactionRoutingModule { }
