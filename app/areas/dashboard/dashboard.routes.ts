// Imports
//import { provideRouter, RouterConfig } from '@angular/router';
import { Routes } from '@angular/router';

import { DashboardComponent }    from './dashboard.component';
import { AuthGuard } from './../../common/auth/auth.guard';

// Route Configuration
//export const DashboardRoutes: RouterConfig = [
//	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
//];

export const DashboardRoutes: Routes = [
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];