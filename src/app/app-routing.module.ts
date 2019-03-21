import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  // { path: 'transactions', loadChildren: './pages/demarcations/demarcations.module#DemarcationsPageModule' },
  // { path: 'demarcations/new', loadChildren: './pages/demarcations/new/new.module#NewPageModule', canActivate: [AuthGuard] },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'transactions',
    loadChildren: './pages/transactions/transactions.module#TransactionsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'transactions/new',
    loadChildren: './pages/transactions/new/new.module#NewPageModule',
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
