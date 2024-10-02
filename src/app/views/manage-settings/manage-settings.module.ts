
import { ManageSettingsRoutingModule } from './manage-settings-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { ModalModule } from '@coreui/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { PageItemDirective, PageLinkDirective, PaginationComponent,ListGroupModule  } from '@coreui/angular';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ManageSettingsComponent } from './manage-settings.component';

import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [ManageSettingsComponent],
  imports: [
    CommonModule,
    ManageSettingsRoutingModule,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    ModalModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    FormsModule,
    HttpClientModule,
    ListGroupModule
  ]
})
export class ManageSettingsModule { }
