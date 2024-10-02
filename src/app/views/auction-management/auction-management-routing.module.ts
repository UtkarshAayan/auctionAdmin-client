import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuctionManagementComponent} from './auction-management.component'
const routes: Routes = [
  {
    path: '',
    component: AuctionManagementComponent,
    data: {
      title: `AuctionManagement`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionManagementRoutingModule { }
