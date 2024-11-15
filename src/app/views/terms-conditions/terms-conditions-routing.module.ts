import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TermsConditionsComponent} from './terms-conditions.component'
const routes: Routes = [{
  path: '',
  component: TermsConditionsComponent,
  data: {
    title: `Manage Terms-Conditions`
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionsRoutingModule { }
