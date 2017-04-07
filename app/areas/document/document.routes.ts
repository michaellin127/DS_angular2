// Imports
import { Routes } from '@angular/router';
import { AuthGuard } from './../../common/auth/auth.guard';

import { DocumentListComponent } from './document-list.component';
import { DocumentDetailComponent } from './document-detail.component';

// Route Configuration
export const DocumentRoutes: Routes = [
	{ path: 'documents', component: DocumentListComponent, canActivate: [AuthGuard] },
	{ path: 'document/:id', component: DocumentDetailComponent, canActivate: [AuthGuard] },
];