// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutes } from './areas/login/login.routes';
import { DashboardRoutes } from './areas/dashboard/dashboard.routes';
import { DocumentRoutes } from './areas/document/document.routes';
import { TemplateRoutes } from './areas/template/template.routes';
import { ContactRoutes } from './areas/contact/contact.routes';

// Route Configuration
export const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
	...DashboardRoutes,
	...LoginRoutes,
	...DocumentRoutes,
	...TemplateRoutes,
	...ContactRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);