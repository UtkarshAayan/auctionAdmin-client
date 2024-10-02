
import { HowToBuyRoutingModule } from './how-to-buy-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { ModalModule } from '@coreui/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
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
import { HowToBuyComponent } from './how-to-buy.component';

import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [HowToBuyComponent],
  imports: [
    CommonModule,
    HowToBuyRoutingModule,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    ModalModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
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
    HttpClientModule
  ]
})
export class HowToBuyModule { }
