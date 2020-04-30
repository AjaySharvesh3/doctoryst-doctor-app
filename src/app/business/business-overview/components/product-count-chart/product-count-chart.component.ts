import {Component, OnInit} from '@angular/core';
import {ChartType} from "chart.js";
import {Label, MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-product-count-chart',
  templateUrl: './product-count-chart.component.html',
  styleUrls: ['./product-count-chart.component.css']
})
export class ProductCountChartComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: Label[] = ['Plants', 'Flowers', 'Seeds', 'Tools'];
  public doughnutChartData: MultiDataSet = [
    [350, 450]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public chartColors: any[] = [
    {
      backgroundColor: ["#4fc3f7", "#b388ff"]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
