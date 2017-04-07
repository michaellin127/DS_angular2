import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';
import { Login } from './login.interface';

@Component({
	moduleId: module.id,
	selector: 'forgot',
	templateUrl:  'forgot.html',
	styleUrls: ['login.css']
})
// Component class
export class ForgotComponent implements OnInit {

	success = false;
	loading = false;
	noEmail = false;
	snackbarContainer: any;
	snackbarData: any;

	login: Login = {
		email: '',
		password: ''
	};

	constructor(private _authService:AuthService) {
	}

	ngOnInit():void {
	}

	onSubmit(f) {

		if (f.valid) {

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

						// now send reset pw email

						var res2 = this._authService.forgot(this.login.email);
						res2.subscribe(
							data => {
								this.loading = false;
								this.success = true;
								
								this.snackbarContainer = document.querySelector('#success-msg');
								this.snackbarData = {
									message: this.snackbarContainer.innerText,
									timeout: 2000
								};
								this.snackbarContainer.MaterialSnackbar.showSnackbar(this.snackbarData);

								f.reset();
							},
							err => {
								this.loading = false;
								console.log('error resetting pw');
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