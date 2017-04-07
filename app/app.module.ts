import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Http, HttpModule} from '@angular/http';
import { AuthHttp, AuthConfig, provideAuth } from 'angular2-jwt';
import { getAuthHttp } from './common/auth/auth.func';
import { AuthGuard } from './common/auth/auth.guard';
import { AuthService } from './common/auth/auth.service';
import { routing } from './app.routes';
import { UrlConfig } from './app.constants';

import { AppComponent }  from './app.component';

import { MdlModule } from 'angular2-mdl';

// import { MaterialModule } from '@angular/material';

// login
import { LoginComponent }  from './areas/login/login.component';
import { SignupComponent }  from './areas/login/signup.component';
import { ForgotComponent }  from './areas/login/forgot.component';
import { ResetComponent }  from './areas/login/reset.component';

// dashboard
import { DashboardComponent }  from './areas/dashboard/dashboard.component';

// documents
import { DocumentService } from './areas/document/document.service';
import { DocumentListComponent }  from './areas/document/document-list.component';
import { DocumentDetailComponent }  from './areas/document/document-detail.component';

// folders
import { FolderService } from './areas/folder/folder.service';

// templates
import { TemplateService } from './areas/template/template.service';
import { TemplateListComponent }  from './areas/template/template-list.component';
import { TemplateDetailComponent }  from './areas/template/template-detail.component';

// contacts
import { ContactService } from './areas/contact/contact.service';
import { ContactListComponent }  from './areas/contact/contact-list.component';
import { ContactDetailComponent }  from './areas/contact/contact-detail.component';

// widgets
import { SpinnerComponent } from './common/widgets/spinner/spinner.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { MDL } from './material.directive';

// validators
import { EqualValidator } from './common/validators/equal-validator.directive';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		InfiniteScrollModule,
		routing,
		MdlModule
		// MaterialModule.forRoot()
	],
	declarations: [
		AppComponent,
		SpinnerComponent,
		LoginComponent,
		SignupComponent,
		ForgotComponent,
		ResetComponent,
		DashboardComponent,
		DocumentListComponent,
		DocumentDetailComponent,
		TemplateListComponent,
		TemplateDetailComponent,
		ContactListComponent,
		ContactDetailComponent,
		EqualValidator,
		MDL
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		AuthService,
		DocumentService,
		FolderService,
		TemplateService,
		ContactService,
		AuthGuard,
		AuthHttp,
		UrlConfig,
		// provideAuth({
		// 	headerName: 'Authorization',
		// 	headerPrefix: 'Bearer',
		// 	tokenName: 'token',
		// 	tokenGetter: (() => localStorage.getItem('token')),
		// 	globalHeaders: [{ 'Content-Type': 'application/json' }],
		// 	noJwtError: true,
		// })
		{
			provide: AuthHttp,
			useFactory: getAuthHttp,
			deps: [Http]
		}
	]
})
export class AppModule { }
