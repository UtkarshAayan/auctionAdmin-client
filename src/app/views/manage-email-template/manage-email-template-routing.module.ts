import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageEmailTemplateComponent } from './manage-email-template.component';
const routes: Routes = [
  {
    path: '',
    component: ManageEmailTemplateComponent,
    data: {
      title: `Manage Email Template`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEmailTemplateRoutingModule { }
