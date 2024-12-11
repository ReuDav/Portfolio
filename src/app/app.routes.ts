import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { HuComponent } from './hu/hu.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: 'hu',
    component: HuComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
