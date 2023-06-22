import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapsComponent } from './components/maps/maps.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { GridTableComponent } from './components/grid-table/grid-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VesselComponent } from './components/vessel/vessel.component';
import { CrewComponent } from './components/crew/crew.component';
import { PortsComponent } from './components/ports/ports.component';
import { StationsComponent } from './components/stations/stations.component';
@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    MapsComponent,
    GridTableComponent,
    VesselComponent,
    CrewComponent,
    PortsComponent,
    StationsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LandingRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LandingModule { }
