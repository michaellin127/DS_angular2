
// TODO: when confirm password errors twice it doesn't make field red, debug

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Reset } from './reset.interface';

@Component({
	moduleId: module.id,
	selector: 'reset',
	templateUrl:  'reset.html',
	styleUrls: ['login.css']
})
// Component class
export class ResetComponent implements OnInit {

	loading = false;
	snackbarContainer: any;
	snackbarData: any;
	private _token: string;
	private _sub: Subscription;

	@ViewChild('success') success;
	@ViewChild('successText') successText;
	@ViewChild('successAction') successAction;

	@ViewChild('error') error;
	@ViewChild('errorText') errorText;
	@ViewChild('errorAction') errorAction;


	reset: Reset = {
		password: '',
		confirm_password: ''
	};

	constructor(private _authService:AuthService,
				private _route: ActivatedRoute,
				private _router: Router) {
	}

	ngOnInit():void {

		// get token parameter
		this._sub = this._route.queryParams.subscribe(
			queryParam => {
				this._token = queryParam['token'];
			}
		);
	}

	ngOnDestroy() {
		this._sub.unsubscribe();
	}

	onSubmit(f) {

		if (f.valid) {

			this.loading = true;

			var res = this._authService.reset(this._token, this.reset.password);
			res.subscribe(
				data => {

					this.loading = false;

					// display success msg
					this.showSuccessMsg();

					// this.success = true;
					f.reset();
				},
				err => {
					console.log(err);

					this.loading = false;

					// display error msg
					this.showErrorMsg();
				}
			);

		}

	}

	showErrorMsg() {

		this.snackbarContainer = this.error.nativeElement;
		this.snackbarData = {
			message: this.errorText.nativeElement.innerText,
			timeout: 10000,
			actionHandler: function(event) {
				window.location.href = "/forgot";
			},
			actionText: this.errorAction.nativeElement.innerText,
		};
		this.snackbarContainer.MaterialSnackbar.showSnackbar(this.snackbarData);

	}

	showSuccessMsg() {

		this.snackbarContainer = this.success.nativeElement;
		this.snackbarData = {
			message: this.successText.nativeElement.innerText,
			timeout: 10000,
			actionHandler: function(event) {
				window.location.href = "/login";
				// this._router.navigate(['login']);
			},
			actionText: this.successAction.nativeElement.innerText,
		};
		this.snackbarContainer.MaterialSnackbar.showSnackbar(this.snackbarData);

	}

}