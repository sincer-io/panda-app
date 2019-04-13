import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
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
    loadChildren: './pages/transaction/transaction.module#TransactionPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'transactions/:id', 
    loadChildren: './pages/transaction/transaction.module#TransactionPageModule',
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
