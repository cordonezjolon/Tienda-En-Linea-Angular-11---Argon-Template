import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosGeneralesService } from '@services/datos-generales.service';
import { CategoriaService } from '@services/categoria.service';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    tipo: string;
    estado: Boolean;
}

export const ROUTES: RouteInfo[] = [
  { path: 'store/tienda/0', title: 'Tienda',  icon:'ni-shop text-pink', class: '' , tipo:'2', estado:true},
  { path: 'store/tienda/0', title: 'Tienda',  icon:'ni-shop text-pink', class: '' , tipo:'1', estado:true},
  { path: 'admin/dashboard', title: 'Dashboard',  icon: 'ni ni-chart-bar-32 text-primary', class: '' , tipo:'1', estado:true},
  { path: 'admin/producto', title: 'Productos',  icon:'ni ni-basket text-info', class: '' , tipo:'1', estado:true},
  { path: 'admin/usuario', title: 'Usuarios',  icon:'ni ni-lock-circle-open text-red', class: '', tipo:'1' , estado:true},
  { path: 'admin/dashboard', title: 'Pedidos',  icon:'ni ni-delivery-fast text-primary', class: '' , tipo:'1', estado:true},
  { path: 'admin/login', title: 'Categorias',  icon:'ni ni-single-copy-04 text-info', class: '' , tipo:'1', estado:true}
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  datosusuario;
  categorias;
  private ruta:String='' ;
  public tipopantalla:number=0;
  public menuItems: any[];
  public isCollapsed = true;
  private ROUTESN: RouteInfo[];
  
  constructor(private router: Router, private datosgenerales:DatosGeneralesService
            , private categoriaservice: CategoriaService) { }

  ngOnInit() {
    this.datosusuario= this.datosgenerales.getUserInfo();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.calcularMenuLateral();
   this.calcularOpciones(this.tipopantalla);
   this.categoriasGenerales();
  }
  calcularMenuLateral(){
    this.ruta= this.router.url;
    if(this.ruta.includes('admin')){
      this.tipopantalla=1;
    }else
    {
      this.tipopantalla=2;
    }
  }
  categoriasGenerales(){
 this.categoriaservice.categorias().subscribe(data=>{
  this.categorias = data;
 })
  }
  calcularOpciones (tipoPantalla){

    for (var i:number=0;i < this.menuItems.length;i++) {
   
      var tipo = this.menuItems[i].tipo;
    
     if(tipo==tipoPantalla){
       
        this.menuItems[i].estado=true;
      }else
      {
        this.menuItems[i].estado=false;      
      }
    }
  }
}
