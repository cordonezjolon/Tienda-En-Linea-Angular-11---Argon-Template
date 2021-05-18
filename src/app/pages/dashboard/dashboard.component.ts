import { CategoriaService } from '@services/categoria.service';
import { ProductoService } from '@services/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from '@app/services/catalogos.service';
import { DatosGeneralesService } from '@app/services/datos-generales.service';
import { UsuarioService } from '@app/services/usuario.service';
import{ GlobalConstants } from '@common/global-constants';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuarios;
  datosusuario:any;
  tiendas:any;
  productos:any;
  categorias:any;
  totaltiendas:number=0;
  totalcategorias:number=0;
  totalproductos:number=0;
  totalusuarios:number=0;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  constructor(private usuarioservice:UsuarioService,public fb: FormBuilder, private datosgenerales:DatosGeneralesService,
    private catalogosservice:CatalogosService,private productoservice:ProductoService,categoriaservice:CategoriaService) {
      this.datosusuario= this.datosgenerales.getUserInfo();

      }
  ngOnInit() {
    console.log(GlobalConstants.apiURL);
    this.traeUsuarios();
    this.traeTiendas();
    this.traeProductos();
    this.traeCategorias();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });


  }
  traeUsuarios(){
    this.usuarioservice.traeUsuarios().subscribe(data=>{
     this.usuarios= data;
     this.totalusuarios = this.usuarios.length;
    })
  }
  traeTiendas(){
    this.catalogosservice.traeTiendas().subscribe(data=>{
    
      this.tiendas= data;
      this.totaltiendas = this.tiendas.length;
    console.log(this.tiendas);
    })
  }
  traeProductos(){
    this.productoservice.traeproductos().subscribe(data=>{
    
      this.productos= data;
      this.totalproductos = this.productos.length;
    console.log(this.productos);
    })
  }
  traeCategorias(){
    this.catalogosservice.categorias().subscribe(data=>{
    
      this.categorias= data;
      this.totalcategorias = this.categorias.length;
    console.log(this.categorias);
    })
  }
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
