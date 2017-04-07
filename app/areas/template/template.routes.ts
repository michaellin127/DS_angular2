// Imports
import { Routes } from '@angular/router';
import { AuthGuard } from './../../common/auth/auth.guard';

import { TemplateListComponent } from './template-list.component';
import { TemplateDetailComponent } from './template-detail.component';

// Route Configuration
export const TemplateRoutes: Routes = [
	{ path: 'templates', component: TemplateListComponent, canActivate: [AuthGuard] },
	{ path: 'template/:id', component: TemplateDetailComponent, canActivate: [AuthGuard] },
];