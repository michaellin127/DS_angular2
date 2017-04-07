import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlConfig } from '../../app.constants';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class ContactService {

	constructor(private _authHttp: AuthHttp, private _config: UrlConfig) {

	}

	getContactList(filterParams) {

		let url = this._config.apiUrl+'contacts?'+filterParams;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getContactCount(filterParams) {

		let url = this._config.apiUrl+'contacts/count?'+filterParams;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getContact(id) {

		let url = this._config.apiUrl+'contacts/'+id;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	createContact(data) {

		let url = this._config.apiUrl+'contacts';
		let body = JSON.stringify({ data });

		return this._authHttp.post(url, body)
			.map(res => res.json());

	}

	updateContact(id, data) {

		let url = this._config.apiUrl+'contacts/'+id;
		let body = JSON.stringify({ data });

		return this._authHttp.put(url, body)
			.map(res => res.json());

	}

	deleteContact(id) {

		let url = this._config.apiUrl+'contacts/'+id;

		return this._authHttp.delete(id)
			.map(res => res.json());

	}

}