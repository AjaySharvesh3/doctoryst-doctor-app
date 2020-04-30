import { Component, OnInit } from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartOptions, ChartType} from "chart.js";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-total-product-count-card',
  templateUrl: './total-product-count-card.component.html',
  styleUrls: ['./total-product-count-card.component.css']
})
export class TotalProductCountCardComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Plants', 'Flowers', 'Seeds', 'Tools'];
  public doughnutChartData: MultiDataSet = [
    [10, 20, 5, 2]
  ];

  public chartColors: any[] = [
    {
      backgroundColor:["#02b3e4", "#a951ed", "#ff5483", "#02ccba"]
    }];

  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
