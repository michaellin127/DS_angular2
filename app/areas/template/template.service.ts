import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UrlConfig } from '../../app.constants';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class TemplateService {

	constructor(private _authHttp: AuthHttp, private _config: UrlConfig) {

	}

	getTemplateList(filterParams) {

		let url = this._config.apiUrl+'templates?'+filterParams;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getTemplateCount(filterParams) {

		let url = this._config.apiUrl+'templates/count?'+filterParams;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	getTemplate(id) {

		let url = this._config.apiUrl+'templates/'+id;

		return this._authHttp.get(url)
			.map(res => res.json());

	}

	createTemplate(data) {

		let url = this._config.apiUrl+'templates';
		let body = JSON.stringify({ data });

		return this._authHttp.post(url, body)
			.map(res => res.json());

	}

	updateTemplate(id, data) {

		let url = this._config.apiUrl+'templates/'+id;
		let body = JSON.stringify({ data });

		return this._authHttp.put(url, body)
			.map(res => res.json());

	}

	deleteTemplate(id) {

		let url = this._config.apiUrl+'templates/'+id;

		return this._authHttp.delete(id)
			.map(res => res.json());

	}

	getTemplateFolderCount() {

		let url = this._config.apiUrl+'templates/folderCount';

		return this._authHttp.get(url)
			.map(res => res.json());

	}


	addToFolders(id, fidParams) {

		let url = this._config.apiUrl+'templates/'+id+'/folder?folder_ids='+fidParams;
		let body = JSON.stringify('');

		return this._authHttp.post(url, body)
			.map(res => res.json());

	}

	removeFromFolders(id, fidParams) {

		let url = this._config.apiUrl+'templates/'+id+'/folder?folder_ids='+fidParams;

		return this._authHttp.delete(url)
			.map(res => res.json());

	}

}