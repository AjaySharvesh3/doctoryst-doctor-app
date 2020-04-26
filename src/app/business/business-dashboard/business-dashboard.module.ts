import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDashboardComponent } from './components/business-dashboard/business-dashboard.component';
import {BusinessDashboardRoutingModule} from "./business-dashboard-routing.module";
import { TotalProductCountCardComponent } from './components/total-product-count-card/total-product-count-card.component';
import { TotalAmountEarnedCountCardComponent } from './components/total-amount-earned-count-card/total-amount-earned-count-card.component';
import { TotalOrdersReceivedCountCardComponent } from './components/total-orders-received-count-card/total-orders-received-count-card.component';
import {ChartsModule} from "ng2-charts";



@NgModule({
  declarations: [BusinessDashboardComponent, TotalProductCountCardComponent, TotalAmountEarnedCountCardComponent, TotalOrdersReceivedCountCardComponent],
  imports: [
    CommonModule,
    ChartsModule,
    BusinessDashboardRoutingModule,
  ]
})
export class BusinessDashboardModule { }
