import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlConfig } from '../../app.constants';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class FolderService {

	constructor(private _authHttp: AuthHttp, private _config: UrlConfig) {

	}

	getFolderList(filterParams) {

		let url = this._config.apiUrl+'folders?'+filterParams;

		return this._authHttp.get(url)
			.map(res => res.json());

	}
	
	createFolder(folder_name) {

		let url = this._config.apiUrl+'folders';
		let body = JSON.stringify({ folder_name });

		return this._authHttp.post(url, body)
			.map(res => res.json());

	}

	updateFolder(id, folder_name) {

		let url = this._config.apiUrl+'folders/'+id;
		let body = JSON.stringify({ folder_name });

		return this._authHttp.put(url, body)
			.map(res => res.json());

	}

	deleteFolder(id) {

		let url = this._config.apiUrl+'folders/'+id;

		return this._authHttp.delete(id)
			.map(res => res.json());

	}

}