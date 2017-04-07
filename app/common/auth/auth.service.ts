import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlConfig } from '../../app.constants';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

	constructor(private _http: Http, private _config: UrlConfig, private _router: Router) {

	}

	saveJwt(jwt) {
		if(jwt) {
			localStorage.setItem('token', jwt);
		}
	}

	isLoggedIn() {
		return tokenNotExpired("token");
	}

	logout() {
		localStorage.removeItem("token");
	}

	login(email, password) {
		let body = JSON.stringify({ email, password });

		var headers = new Headers({
			"Content-Type": "application/json"
		});

		var options = new RequestOptions({
			headers: headers
		});
		
		return this._http.post(this._config.apiUrl+'users/login', body, options)
			.map(res => res.json());
	}

	oauth(token, provider) {
		let body = JSON.stringify({ token, provider });

		var headers = new Headers({
			"Content-Type": "application/json"
		});

		var options = new RequestOptions({
			headers: headers
		});

		return this._http.post(this._config.apiUrl+'users/oauth', body, options)
			.map(res => res.json());
	}


	exists(email) {
		let body = JSON.stringify({ email });

		var headers = new Headers({
			"Content-Type": "application/json"
		});

		var options = new RequestOptions({
			headers: headers
		});

		return this._http.post(this._config.apiUrl+'users/exists', body, options)
			.map(res => res.json());
	}

	signup(user) {
		let body = user;

		var headers = new Headers({
			"Content-Type": "application/json"
		});

		var options = new RequestOptions({
			headers: headers
		});

		return this._http.post(this._config.apiUrl+'users/signup', body, options)
			.map(res => res.json());
	}

	forgot(email) {
		let body = JSON.stringify({ email });

		var headers = new Headers({
			"Content-Type": "application/json"
		});

		var options = new RequestOptions({
			headers: headers
		});

		return this._http.post(this._config.apiUrl+'users/forgotpassword', body, options)
			.map(res => res.json());
	}

	reset(token, password) {
		let body = JSON.stringify({ token, password });

		var headers = new Headers({
			"Content-Type": "application/json"
		});

		var options = new RequestOptions({
			headers: headers
		});

		return this._http.post(this._config.apiUrl+'users/resetpassword', body, options)
			.map(res => res.json());
	}


}