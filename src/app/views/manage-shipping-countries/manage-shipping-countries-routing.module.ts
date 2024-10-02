import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageShippingCountriesComponent } from './manage-shipping-countries.component';
const routes: Routes = [ {
  path: '',
  component: ManageShippingCountriesComponent,
  data: {
    title: `Manage Countries`
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageShippingCountriesRoutingModule { }
