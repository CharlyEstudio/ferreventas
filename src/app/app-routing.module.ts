import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'cliente/:data', loadChildren: './cliente/cliente.module#ClientePageModule' },
  { path: 'viajar/:data', loadChildren: './viajar/viajar.module#ViajarPageModule' },
  { path: 'modal/:data', loadChildren: './components/modal/modal.module#ModalPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },  { path: 'config', loadChildren: './config/config.module#ConfigPageModule' },
  { path: 'existencias', loadChildren: './existencias/existencias.module#ExistenciasPageModule' },
  { path: 'listaprecios', loadChildren: './listaprecios/listaprecios.module#ListapreciosPageModule' },
  { path: 'edocta', loadChildren: './edocta/edocta.module#EdoctaPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
