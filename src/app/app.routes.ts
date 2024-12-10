import { Routes } from '@angular/router';
import { HuComponent } from './hu/hu.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'hu',
    component: HuComponent,
  },
  {
    path: '',
    component: AppComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
