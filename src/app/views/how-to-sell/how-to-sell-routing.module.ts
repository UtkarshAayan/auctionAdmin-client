import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HowToSellComponent} from './how-to-sell.component'
const routes: Routes = [ {
  path: '',
  component: HowToSellComponent,
  data: {
    title: `ManageSellContent`
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowToSellRoutingModule { }
