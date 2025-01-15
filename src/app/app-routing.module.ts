import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
  // },
  // {
  //   path: 'sign-up',
  //   loadChildren: () => import('./auth/sign-up/sign-up.module').then( m => m.SignUpPageModule),
  // },
  // {
  //   path: 'recover-password',
  //   loadChildren: () => import('./auth/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule),
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
