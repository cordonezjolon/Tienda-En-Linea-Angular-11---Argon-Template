

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule ,FormBuilder, FormGroup } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { IconsComponent } from '@pages/icons/icons.component';
import { MapsComponent } from '@pages/maps/maps.component';
import { UserProfileComponent } from '@pages/user-profile/user-profile.component';
import { TablesComponent } from '@pages/tables/tables.component';
import { UsuarioComponent } from '@pages/usuario/usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MantproductoComponent } from '@pages/mantproducto/mantproducto.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    UsuarioComponent,
    MantproductoComponent
  ]
})

export class AdminLayoutModule {}
