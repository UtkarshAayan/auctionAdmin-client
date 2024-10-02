import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpContentComponent } from './help-content.component';
const routes: Routes = [
  {
    path: '',
    component: HelpContentComponent,
    data: {
      title: `ManageBuyerPremium`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpContentRoutingModule { }
