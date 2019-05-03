import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'cliente/:data', loadChildren: './cliente/cliente.module#ClientePageModule' },
  { path: 'viajar/:data', loadChildren: './viajar/viajar.module#ViajarPageModule' },
  { path: 'modal/:data', loadChildren: './components/modal/modal.module#ModalPageModule' },  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
