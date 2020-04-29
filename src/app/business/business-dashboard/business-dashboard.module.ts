import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessDashboardComponent} from './components/business-dashboard/business-dashboard.component';
import {BusinessDashboardRoutingModule} from "./business-dashboard-routing.module";
import {TotalProductCountCardComponent} from './components/total-product-count-card/total-product-count-card.component';
import {TotalAmountEarnedCountCardComponent} from './components/total-amount-earned-count-card/total-amount-earned-count-card.component';
import {TotalOrdersReceivedCountCardComponent} from './components/total-orders-received-count-card/total-orders-received-count-card.component';
import {ChartsModule} from "ng2-charts";
import { ProductCountChartComponent } from './components/product-count-chart/product-count-chart.component';
import { AmountEarnedAndOrderReceivedChartComponent } from './components/amount-earned-and-order-received-chart/amount-earned-and-order-received-chart.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import { BusinessInfoComponent } from './components/business-info/business-info.component';


@NgModule({
  declarations: [
    BusinessDashboardComponent,
    TotalProductCountCardComponent,
    TotalAmountEarnedCountCardComponent,
    TotalOrdersReceivedCountCardComponent,
    ProductCountChartComponent,
    AmountEarnedAndOrderReceivedChartComponent,
    BusinessInfoComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    CollapseModule.forRoot(),
    BusinessDashboardRoutingModule,
  ]
})
export class BusinessDashboardModule {
}
