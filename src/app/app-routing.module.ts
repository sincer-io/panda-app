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
  {
    path: 'people',
    loadChildren: './pages/people/people.module#PeoplePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'people/:id',
    loadChildren: './pages/person/person.module#PersonPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: './pages/categories/categories.module#CategoriesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/:id',
    loadChildren: './pages/category/category.module#CategoryPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'locations',
    loadChildren: './pages/locations/locations.module#LocationsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'locations/:id',
    loadChildren: './pages/location/location.module#LocationPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'tags',
    loadChildren: './pages/tags/tags.module#TagsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'tags/:id',
    loadChildren: './pages/tag/tag.module#TagPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: './pages/about/about.module#AboutPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'import',
    loadChildren: './pages/import/import.module#ImportPageModule',
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
