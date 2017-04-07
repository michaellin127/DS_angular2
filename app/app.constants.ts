import { Injectable } from '@angular/core';

@Injectable()
export class UrlConfig {
	public host: string = "http://api.ds.com/";
	public apiPath: string = "v1/";
	public apiUrl: string = this.host + this.apiPath;
}