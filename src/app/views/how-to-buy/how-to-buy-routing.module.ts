import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HowToBuyComponent} from './how-to-buy.component'
const routes: Routes = [{
  path: '',
  component: HowToBuyComponent,
  data: {
    title: `ManageBuyContent`
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowToBuyRoutingModule { }
