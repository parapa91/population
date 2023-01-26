import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Population' }
    ]
  };

  public chartClicked({ event, active }: { event?: any, active?: {}[] }): void {
    const name = this.dataService.names[event?.chart.getActiveElements()[0].index];
    this._router.navigate([name.toLowerCase()]);
  }

  public updateData(): void {
    this.barChartData.datasets[0].data = this.dataService.population;
    this.barChartData.labels = this.dataService.names;
    this.chart?.update();
  }

  constructor(private _router: Router, private dataService: DataService ) {}

  ngOnInit(): void {
    this.dataService.RefreshRequired.subscribe(response => {
      if (response) {
        this.updateData();
      }
    });
  }

}
