// Imports
import { Routes } from '@angular/router';

import { LoginComponent }    from './login.component';
import { SignupComponent }    from './signup.component';
import { ForgotComponent }    from './forgot.component';
import { ResetComponent }    from './reset.component';

// Route Configuration
export const LoginRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'forgot', component: ForgotComponent },
	{ path: 'reset', component: ResetComponent }
];