import { Component } from '@angular/core';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 

  constructor() {this.grafica()}

  pieChartData:any = {}
  pieChartType: ChartType = 'doughnut'; // tipo de gráfico

  grafica(){

    this.pieChartData = {
      labels: ['Saldo', 'Gastos'], // etiquetas de las secciones
      datasets: [{
        data: [300, 500], // los datos que representan los valores
        backgroundColor: ['#ec4d4d', '#4dec5b'], // colores de cada sección
        hoverBackgroundColor: ['darkred', 'darkgreen'] // colores al pasar el mouse
      }]
    };
    
  }
  

}
