import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./pages/tables/tables.module').then((m) => m.TablesPageModule),
  },
  {
    path: 'table-details',
    loadChildren: () => import('./pages/table-details/table-details.module').then( m => m.TableDetailsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}