import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';

import { Signup } from './signup.interface';

@Component({
	moduleId: module.id,
	selector: 'signup',
	templateUrl:  'signup.html',
	styleUrls: ['login.css']
})
// Component class
export class SignupComponent implements OnInit {

	loading = false;
	gLoading = false;
	emailExists = false;
	googleExists = false;

	googleLoginButtonId = "google-login-button";
	userAuthToken = null;
	userDisplayName = "empty";
	auth2: any;
	termsAgree: boolean;

	signup: Signup = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		img_url: '',
		oauth_provider: ''
	};

	constructor(private _authService:AuthService, private _zone: NgZone) {
	}

	ngOnInit():void {
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

					this.oauthSignup(googleUser);

				});
			},(error) => {
				alert(JSON.stringify(error, undefined, 2));
			});
	}

	onSubmit(f) {

		if(f.valid) {

			this.emailExists = false;

			// set loader
			this.loading = true;

			// check to see if email exists
			var res = this._authService.exists(this.signup.email);
			res.subscribe(
				data => {
					if(data) {
						this.emailExists = true;
						this.loading = false;
					} else {

						// now try to create new user
						var res2 = this._authService.signup(this.signup);
						res2.subscribe(
							data => {
								this._authService.saveJwt(data.token);
								window.location.href = "/dashboard";
								this.loading = false;
							},
							err => {
								this.loading = false;
							}
						);

					}
				},
				err => {
				}
			);

		}

	}

	oauthSignup(googleUser) {

		// check to see if we are already authenticated
		
		if(!this._authService.isLoggedIn()) {

			// Useful data for your client-side scripts:
			var profile = googleUser.getBasicProfile();

			// The ID token you need to pass to your backend:
			// var id_token = googleUser.getAuthResponse().id_token;

			// check to see if this user has already signed up
			var userExists = false;
			var res = this._authService.exists(profile.getEmail());
			res.subscribe(
				data => {
					if(data) {

						this.googleExists = true;

					} else {

						this.gLoading = true;

						// now try to create new user

						this.signup.email = profile.getEmail();
						this.signup.password = profile.getId();
						this.signup.first_name = profile.getGivenName();
						this.signup.last_name = profile.getFamilyName();
						this.signup.img_url = profile.getImageUrl();
						this.signup.oauth_provider = "google";

						var res2 = this._authService.signup(this.signup);
						res2.subscribe(
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
				},
				err => {
				}
			);
			
		}
	}

}