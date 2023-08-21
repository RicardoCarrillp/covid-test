import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VigilanteGuard} from "../guards/vigilante.guard";
import {LoginVigilanteGuard} from "../guards/login-vigilante.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate:[LoginVigilanteGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[VigilanteGuard]
  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
