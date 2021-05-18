import { ProductoService } from '@services/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos:any;
  idCategoria ='0';
  constructor(private route: ActivatedRoute,private producto:ProductoService,private _activatedRoute: ActivatedRoute) { 
    this._activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
      });
    

  }

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get("idCategoria");
    console.log(Number(this.idCategoria))
   var categoria = Number(this.idCategoria)
    if(categoria==0){
      this.producto.traeproductos().subscribe(listproductos =>{
        this.productos = listproductos;
        console.log('Productos',this.productos)
       });
    } else
    {
      this.producto.productoscategoria(this.idCategoria).subscribe(listproductos =>{
        this.productos = listproductos;
        console.log('Productos',this.productos)
       });
    }

   
  }

}
