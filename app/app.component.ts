
import { Component, enableProdMode, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './common/auth/auth.service';

enableProdMode();
@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.html',
	styleUrls: ['app.css']
})

// App Component class
export class AppComponent{

	public isLogin = false;

	@ViewChild('nav') nav;


	constructor(private _authService: AuthService, private _router: Router) {
		this.isLogin = this._authService.isLoggedIn();
	}

	logout() {
		this._authService.logout();
		window.location.href = "/login";
	}

	onClick(event) {

		// this will close drawer as sub nav links are clicked

		if(event.target.className == 'mdl-navigation__link')
			this.nav.nativeElement.MaterialLayout.drawerToggleHandler_();

	}

}
