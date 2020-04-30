import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-amount-earned-and-order-received-chart',
  templateUrl: './amount-earned-and-order-received-chart.component.html',
  styleUrls: ['./amount-earned-and-order-received-chart.component.css']
})
export class AmountEarnedAndOrderReceivedChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                                    'August', 'September', 'October', 'November', 'December'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public chartColors: any[] = [
    {
      backgroundColor:["#0069ff", "#0069ff", "#0069ff", "#0069ff",
                       "#0069ff", "#0069ff", "#0069ff", "#0069ff",
                       "#0069ff", "#0069ff", "#0069ff", "#0069ff"]
    },
    {
      backgroundColor:["#a951ed", "#a951ed", "#a951ed", "#a951ed",
                       "#a951ed", "#a951ed", "#a951ed", "#a951ed",
                       "#a951ed", "#a951ed", "#a951ed", "#a951ed"]
    }];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 80], label: 'Orders Received' },
    { data: [28, 48, 40, 19, 28, 48, 40, 19, 28, 48, 40, 90], label: 'Amounts Earned' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
