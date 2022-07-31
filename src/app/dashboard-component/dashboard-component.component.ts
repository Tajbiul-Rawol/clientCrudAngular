import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponent implements OnInit {

  trades:any[]=[];
  asphalt:number = 0;
  bulldozer:number = 0;
  brickLaying:number = 0;
  microPiling:number = 0;
  pageNumber:number = 1;
  pageSize: number = 200;
  constructor(private service: ServiceService) { }

  ngOnInit(){
    this.getAllTradeData();
    this.getTrades();
  }

  getTrades(){
    this.service.getAll().subscribe((data: any) => {
      data.trades.forEach((t)=>{
        this.trades.push(t.Name);
      })
      setTimeout(() =>this.generateBarChart(),1000);
      setTimeout(() =>this.generatePieChart(),1000);
    })
}
  getAllTradeData() {
    this.service
  .getDetails(this.pageNumber, this.pageSize)
  .subscribe((data: any)=>{
    data.Trades.forEach((t)=>{
       if (t.TradeName === this.trades[0]) {
          this.asphalt++;
       }else if (t.TradeName === this.trades[1]){
          this.bulldozer++;
       }else if (t.TradeName === this.trades[2]){
          this.brickLaying++;
       }else{
          this.microPiling++;
       }
    })
  })
  }

  generateBarChart(){
    const ctx = "myChart";
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [...this.trades],
          datasets: [{
              label: '# of Trades',
              data: [this.asphalt, this.bulldozer, this.brickLaying, this.microPiling],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  generatePieChart(){
    const ctx = "pieChart";
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: [...this.trades],
          datasets: [{
              label: '# of Trades',
              data: [this.asphalt, this.bulldozer, this.brickLaying, this.microPiling],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

}
