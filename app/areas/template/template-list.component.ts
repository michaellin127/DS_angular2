import { Component, OnInit } from '@angular/core';
import { TemplateService } from './template.service';
import { FolderService } from '../folder/folder.service';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
	moduleId: module.id,
	selector: 'template-list',
	templateUrl:  'template-list.html'
})
// Component class
export class TemplateListComponent implements OnInit {

	loadingTemps = false;
	loadingMore = false;
	folderFilters = [];
	templates = [];
	params = {
		'page': 0,
		'sort': '',
		'search': '',
		'date_range': '',
		'folder_ids': ''
	};
	count = 0;
	chunk = 20;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _templateService: TemplateService,
		private _folderService: FolderService,
		private _router: Router
	) { }

	ngOnInit():void {

		this.getFolderFilters();
		this.getTemplates();

	}

	getFolderFilters() {

		// get document folder list
		var res = this._templateService.getTemplateFolderCount();
		res.subscribe(
			data => {
				this.folderFilters = data;
			},
			err => {
				console.log(err);
				this.checkAuth("Could not get folders");
			}
		);

	}

	getTemplates() {

		this.params.page = 1;
		this.loadingTemps = true;

		// build params string for the service call
		var params = this.getParamStr();

		// get template list
		var res = this._templateService.getTemplateList(params);

		res.subscribe(
			data => {
				this.loadingTemps = false;
				this.templates = data;

				// get templates count used for paging
				var res2 = this._templateService.getTemplateCount(params);

				res2.subscribe(
					data2 => {
						this.count = data2.count;
					},
					err => {

					});

			},
			err => {
				this.checkAuth("Could not get templates");
			}
		);

	}

	getMoreTemplates() {

		this.loadingMore = true;

		// build params string for the service call
		var params = this.getParamStr();

		// get document list
		var res = this._templateService.getTemplateList(params);

		res.subscribe(
			data => {
				this.loadingMore = false;
				this.templates.push(...data);
			},
			err => {
				this.checkAuth("Could not get more templates");
			}
		);

	}

	setFolderFilter(folder_id) {
		this.params.folder_ids = folder_id;
		this.getTemplates();
	}

	setSearchFilter(event:any) {
		this.params.search = event.target.value;
		this.getTemplates();
	}

	setSortFilter(event:any) {
		this.params.sort = event.target.value;
		this.getTemplates();
	}

	getParamStr() {

		var paramStr = '';

		for(var key in this.params) {

			if(this.params[key]) {
				if(paramStr == '') {
					paramStr += key+'='+this.params[key];
				} else {
					paramStr += '&'+key+'='+this.params[key];
				}
			}
		}

		return paramStr;

	}

	onScroll() {
		if((this.params.page * this.chunk) < this.count) {
			this.params.page++;
			this.getMoreTemplates();
		}
	}

	checkAuth(msg) {

		console.log(msg);

		var token = localStorage.getItem('token');
		if(this.jwtHelper.isTokenExpired(token)) {
			this._router.navigate(['login']);
		}

	}

}