import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'record-list',
    pathMatch: 'full'
  },
  {
    path: 'record-list',
    loadChildren: () => import('./record/record-list/record-list.module').then( m => m.RecordListPageModule)
  },
  {
    path: 'record-detail',
    loadChildren: () => import('./record/record-detail/record-detail.module').then( m => m.RecordDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }