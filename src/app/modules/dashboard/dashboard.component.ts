import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Papa } from 'ngx-papaparse';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  totalData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Porcentaje del total de muertes vs la población total por estado',
      },
    },
  };

  subscription!: Subscription;
  inputFile!: FormControl;
  jsonData!: any;
  sumTotalByState!: any;
  dataForState: any = [];


  maxTotal = 0;
  minTotal = 0;
  maxState: any = [];
  minState: any = [];
  worstState: any = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private papa: Papa
  ) {
    this.subscription = authService
      .isLoggedIn()
      .subscribe((isLoggedIn: boolean) => {
        if (!isLoggedIn) this.router.navigate(['/login']);
      });

  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        this.parseCsvData(reader.result as string);
      };
    }
  }

  getAnswers(data: any) {
    const lastDate = '12/31/20';
    data.forEach((element: any) => {
      if (!this.dataForState.includes(element.Province_State)) {
        this.dataForState.push({
          name: element.Province_State,
          total: element[lastDate],
          population: element.Population,
        });
      }
    });

    this.getMinAndMaxTotal(this.dataForState);

    localStorage.setItem('dataForState', JSON.stringify(this.dataForState));
  }

  getMinAndMaxTotal(dataForState: any) {
    const dataState: any = {};
    const dataChart: any = []

    for (const obj of dataForState) {
      const name = obj.name;
      const total = Number(obj.total);
      const population = Number(obj.population);

      if (!dataState[name]) {
        dataState[name] = { name, total: 0, population: 0 };
      }

      dataState[name].total = dataState[name].total + total;
      dataState[name].population = dataState[name].population + population;
      dataState[name].totalMinusPopu = Math.abs(dataState[name].population - dataState[name].total);

    }

    this.sumTotalByState = Object.values(dataState);

    for (const obj of this.sumTotalByState) {
      const name = obj.name;
      const total = obj.total;
      const population = obj.population;

      dataChart.push({
        label: name,
        percentage: Number(((Number(total) / Number(population)) * 100).toFixed(2)) !== Infinity || NaN
          ? Number(((Number(total) / Number(population)) * 100).toFixed(2))
          : 0,
      });

      this.totalData = {
        labels: dataChart.map((item: any) => item.label),
        datasets: [
          {
            label: 'Total de muertes vs la población total %',
            data: dataChart.map((item: any) => item.percentage),
          },
        ]
      }
      if (total > this.maxTotal) {
        this.maxTotal = total;
        this.maxState.push(name);
      }
      if (total <= this.minTotal) {
        this.minTotal = total;
        this.minState.push(name);
      }

    }
    this.worstState = dataChart.reduce((maxObj: any, obj: any) =>
      (obj.percentage > maxObj.percentage ? obj : maxObj), dataChart[0]);
  }

  parseCsvData(csvContent: string) {
    this.papa.parse(csvContent, {
      header: true,
      complete: (result) => {
        this.jsonData = result.data;
      },
    });
    this.getAnswers(this.jsonData);
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('dataForState');
  }

  ngOnInit() {
    this.jsonData = JSON.parse(localStorage.getItem('dataForState')!);
    if (this.jsonData) this.getMinAndMaxTotal(this.jsonData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
