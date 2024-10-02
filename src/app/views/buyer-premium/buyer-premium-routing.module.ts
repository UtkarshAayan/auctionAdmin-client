import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerPremiumComponent } from './buyer-premium.component';
const routes: Routes = [
  {
    path: '',
    component: BuyerPremiumComponent,
    data: {
      title: `ManageBuyerPremium`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerPremiumRoutingModule { }
