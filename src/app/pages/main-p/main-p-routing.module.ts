import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPPage } from './main-p.page';

const routes: Routes = [
  {
    path: '',
    component: MainPPage,
    children: [
  {
    path: 'CitasConcluidas'    ,loadChildren: () => import('./CitasConcluidas/CC.module').then( m => m.CCPageModule)
  },
  {
    path: 'profile',loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'reportes',loadChildren: () => import('./reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'CitasPendientes',loadChildren: () => import('./CitasPendientes/CP.module').then( m => m.HomePageModule)
  }

  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPPageRoutingModule {}
