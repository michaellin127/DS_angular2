// Imports
import { Routes } from '@angular/router';
import { AuthGuard } from './../../common/auth/auth.guard';

import { ContactListComponent } from './contact-list.component';
import { ContactDetailComponent } from './contact-detail.component';

// Route Configuration
export const ContactRoutes: Routes = [
	{ path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard] },
	{ path: 'contact/:id', component: ContactDetailComponent, canActivate: [AuthGuard] },
];