import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBuyersComponent } from './manage-buyers.component';
const routes: Routes = [
  {
    path: '',
    component: ManageBuyersComponent,
    data: {
      title: `BuyerManagement`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBuyersRoutingModule { }
