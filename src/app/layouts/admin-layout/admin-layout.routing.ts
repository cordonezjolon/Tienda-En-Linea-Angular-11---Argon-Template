import { TiendaComponent } from '@pages/tienda/tienda.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { IconsComponent } from '@pages/icons/icons.component';
import { MapsComponent } from '@pages/maps/maps.component';
import { UserProfileComponent } from '@pages/user-profile/user-profile.component';
import { TablesComponent } from '@pages/tables/tables.component';
import { UsuarioComponent } from '@pages/usuario/usuario.component';
import { MantproductoComponent } from '@pages/mantproducto/mantproducto.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin/dashboard',      component: DashboardComponent },
    { path: 'admin/user-profile',   component: UserProfileComponent },
    { path: 'admin/tables',         component: TablesComponent },
    { path: 'admin/icons',          component: IconsComponent },
    { path: 'admin/usuario',          component: UsuarioComponent },
    { path: 'admin/producto',          component: MantproductoComponent },
    { path: 'admin/maps',           component: MapsComponent }
];

