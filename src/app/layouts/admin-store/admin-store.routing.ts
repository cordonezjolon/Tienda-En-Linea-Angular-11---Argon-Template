
import { TiendaComponent } from '@pages/tienda/tienda.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { IconsComponent } from '@pages/icons/icons.component';
import { MapsComponent } from '@pages/maps/maps.component';
import { UserProfileComponent } from '@pages/user-profile/user-profile.component';
import { TablesComponent } from '@pages/tables/tables.component';
import { ProductoComponent } from '@pages/producto/producto.component';
import { CarritoComponent } from '@pages/carrito/carrito.component';
export const AdminStoreRoutes: Routes = [
    { path: 'store/dashboard',      component: DashboardComponent },
    { path: 'store/tienda/:idCategoria',      component: TiendaComponent },
    { path: 'store/carrito',      component: CarritoComponent },
    { path: 'store/user-profile',   component: UserProfileComponent },
    { path: 'store/producto/:idProducto', component: ProductoComponent }
];
