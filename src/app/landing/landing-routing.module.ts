import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './landing.component';
import { VesselComponent } from './components/vessel/vessel.component';
import { CrewComponent } from './components/crew/crew.component';
import { PortsComponent } from './components/ports/ports.component';
import { StationsComponent } from './components/stations/stations.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: '', redirectTo: 'voyages', pathMatch: 'full' },
      {
        path: 'voyages', component: DashboardComponent
      },
      {
        path: 'vessels', component: VesselComponent
      },
      {
        path: 'crew', component: CrewComponent
      },
      {
        path: 'ports', component: PortsComponent
      },
      {
        path: 'stations', component: StationsComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
