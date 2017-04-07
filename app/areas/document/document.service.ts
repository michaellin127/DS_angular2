import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlConfig } from '../../app.constants';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class DocumentService {

	constructor(private _authHttp: AuthHttp, private _config: UrlConfig) {

	}

	getDocList(filterParams) {

		let url = this._config.apiUrl+'documents?'+filterParams;
		
		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getDocCount(filterParams) {

		let url = this._config.apiUrl+'documents/count?'+filterParams;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getDoc(id) {

		let url = this._config.apiUrl+'documents/'+id;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	createDoc(data) {
	
		let url = this._config.apiUrl+'documents';
		let body = JSON.stringify({ data });

		return this._authHttp.post(url, body)
			.map(res => res.json());

	}

	updateDoc(id, data) {
		
		let url = this._config.apiUrl+'documents/'+id;
		let body = JSON.stringify({ data });

		return this._authHttp.put(url, body)
			.map(res => res.json());

	}

	deleteDoc(id) {
		
		let url = this._config.apiUrl+'documents/'+id;

		return this._authHttp.delete(id)
			.map(res => res.json());

	}

	getDocStatusList() {

		let url = this._config.apiUrl+'documents/status';

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getDocStatusCount() {

		let url = this._config.apiUrl+'documents/statusCount';

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getDocFolderCount() {

		let url = this._config.apiUrl+'documents/folderCount';

		return this._authHttp.get(url)
			.map(res => res.json());

	}


	addToFolders(id, fidParams) {

		let url = this._config.apiUrl+'documents/'+id+'/folder?folder_ids='+fidParams;
		let body = JSON.stringify('');

		return this._authHttp.post(url, body)
			.map(res => res.json());

	}

	removeFromFolders(id, fidParams) {

		let url = this._config.apiUrl+'documents/'+id+'/folder?folder_ids='+fidParams;

		return this._authHttp.delete(url)
			.map(res => res.json());

	}

}