

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
;import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminStoreRoutes } from './admin-store.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TiendaComponent } from '@pages/tienda/tienda.component';
import { ProductoComponent } from '@pages/producto/producto.component';
import { CarritoComponent } from '@pages/carrito/carrito.component';


// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminStoreRoutes),
    
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    
    
  ],
  declarations: [
    TiendaComponent,
    ProductoComponent,
    CarritoComponent
  ]
})

export class AdminStoreModule {}
