import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';
import { Login } from './login.interface';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl:  'login.html',
	styleUrls: ['login.css']
})
// Component class
export class LoginComponent implements OnInit {

	loading = false;
	gLoading = false;
	noEmail = false;
	wrongPassword = false;

	googleLoginButtonId = "google-login-button";
	userAuthToken = null;
	userDisplayName = "empty";
	auth2: any;

	login: Login = {
		email: '',
		password: ''
	};

	constructor(
		private _authService: AuthService,
		private _zone: NgZone) {
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {

		// loading for google sign in
		gapi.load('auth2', () => {
			// Retrieve the singleton for the GoogleAuth library and set up the client.
			this.auth2 = gapi.auth2.init({
				client_id: '950434156772-ht0ttqggs8lipkpkap7dvi15o4m596kf.apps.googleusercontent.com',
				cookie_policy: 'single_host_origin'
			});
			this.attachSignin(document.getElementById('customBtn'));
		});


	}

	attachSignin(element) {
		this.auth2.attachClickHandler(element, {},
			(googleUser) => {

				this._zone.run(() => {

					// check to see if we are already authenticated

					if(!this._authService.isLoggedIn()) {

						this.gLoading = true;

						var token = googleUser.getAuthResponse().id_token;

						var res = this._authService.oauth(token, 'google');
						res.subscribe(
							data => {
								this._authService.saveJwt(data.token);
								window.location.href = "/dashboard";
								this.gLoading = false;
							},
							err => {
								this.gLoading = false;
							}
						);

					}

				});
			},(error) => {
				alert(JSON.stringify(error, undefined, 2));
			});
	}

	onSubmit(f) {
		
		if(f.valid) {

			this.wrongPassword = false;
			this.noEmail = false;

			// set loader
			this.loading = true;

			// first check to see if the email exists in our system

			var res = this._authService.exists(this.login.email);
			res.subscribe(
				data => {
					if(!data) { // email doesn't exist

						this.noEmail = true;
						this.loading = false;

					} else { // email exists

						// now try to log in the user and check for incorrect password

						var res2 = this._authService.login(this.login.email, this.login.password);
						res2.subscribe(
							data => { // successful login

								this._authService.saveJwt(data.token);
								window.location.href = "/dashboard";
								this.loading = false;

							},
							err => { // wrong password

								this.wrongPassword = true;
								this.loading = false;

							}
						);


					}
				},
				err => {
					// error sending check email request
				}
			);

		}

	}


}
