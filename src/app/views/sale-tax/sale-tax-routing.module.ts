import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleTaxComponent } from './sale-tax.component';
const routes: Routes = [
  {
    path: '',
    component: SaleTaxComponent,
    data: {
      title: `ManageSalestax`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleTaxRoutingModule { }
